


let fs = require('fs');
let EventEmitter = require('events');
function computeNewHighWaterMark(n) {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
     return n;
  }
class ReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.autoClose = options.autoClose || true;
        this.start = 0;
        this.end = options.end;
        this.flags = options.flags || 'r';

        this.buffers = []; // 缓存区 
        this.pos = this.start;
        this.length = 0; // 缓存区大小
        this.emittedReadable = false;
        this.reading = false; // 不是正在读取的
        this.open();
        this.on('newListener', (eventName) => {
            if (eventName === 'readable') {
                this.read();
            }
        })
    }
    read(n) { // 想取1个

        if(n>this.length){
            // 更改缓存区大小  读取五个就找 2的几次放最近的
            this.highWaterMark = computeNewHighWaterMark(n)
            this.emittedReadable = true;
            this._read();
        }


        // 如果n>0 去缓存区中取吧
        let buffer=null;
        let index = 0; // 维护buffer的索引的
        let flag = true;
        if (n > 0 && n <= this.length) { // 读的内容 缓存区中有这么多
            // 在缓存区中取 [[2,3],[4,5,6]]
            buffer = Buffer.alloc(n); // 这是要返回的buffer
            let buf;
            while (flag&&(buf = this.buffers.shift())) {
                for (let i = 0; i < buf.length; i++) {
                    buffer[index++] = buf[i];
                    if(index === n){ // 拷贝够了 不需要拷贝了
                        flag = false;
                        this.length -= n;
                        let bufferArr = buf.slice(i+1); // 取出留下的部分
                        // 如果有剩下的内容 在放入到缓存中
                        if(bufferArr.length > 0){
                            this.buffers.unshift(bufferArr);
                        }
                        break;
                    }
                }
            }
        }
        // 当前缓存区 小于highWaterMark时在去读取
        if (this.length == 0) {
            this.emittedReadable = true;
        }
        if (this.length < this.highWaterMark) {
            if(!this.reading){
                this.reading = true;
                this._read(); // 异步的
            }
        }
        return buffer
    }
    // 封装的读取的方法
    _read() {
        // 当文件打开后在去读取
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._read());
        }
        // 上来我要喝水 先倒三升水 []
        let buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fd, buffer, 0, buffer.length, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                // 默认读取的内容放到缓存区中
                this.buffers.push(buffer.slice(0, bytesRead));
                this.pos += bytesRead; // 维护读取的索引
                this.length += bytesRead;// 维护缓存区的大小
                this.reading = false;
                // 是否需要触发readable事件
                if (this.emittedReadable) {
                    this.emittedReadable = false; // 下次默认不触发
                    this.emit('readable');
                }
            } else {
                this.emit('end');
                this.destroy();
            }
        })
    }
    destroy() {
        if (typeof this.fd !== 'number') {
            return this.emit('close')
        }
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err);
                if (this.autoClose) {
                    this.destroy();
                }
                return
            }
            this.fd = fd;
            this.emit('open');
        });
    }
}

module.exports = ReadStream;