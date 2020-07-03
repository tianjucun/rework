
/**
 * 实现原理：通过监听 readable 事件开启暂停模式
 * 
 *  只要发现用户开启了 readable 监听，就以 highWaterMark 为目标字节数来更新缓存区域
 * 
 *  当用于调用 read(n) 方法时, 
 * 
 *          如果 n > this.length(大于缓存区域) => 去调底层读取函数 _read 来填充缓存区
 * 
 *          如果 n < this.length => 从缓存区中进行 shift(), 获取到的数据直接返回给用户
 * 
 *      重要操作:       let bufferArr = buf.slice(i+1); // 取出留下的部分
                        // 如果有剩下的内容 在放入到缓存中
                        if(bufferArr.length > 0){
                            this.buffers.unshift(bufferArr);
                        }
 * 
 *  
 * 
 * 
 */

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
        this.flags = options.flags || 'r';
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end;
        this.encoding = options.encoding || 'utf8';
        this.highWaterMark = this.highWaterMark || 64 * 1024;

        this.buffer = Buffer.alloc(this.highWaterMark);
        // 创建缓存区
        this.buffers = [];

        this.pos = this.start;
        this.length = 0; // 缓存区大小
        // 是否可以触发 readable 事件
        this.emittedReadable = false;
        // 是否正在读文件
        this.reading = false;
        
        // 打开文件
        this.open();

        // 监听新事件的添加
        this.on("newListener", eventName => {
            if(eventName === "readable") {
                this.read();
            }
        });
    }

    read(n) {
        console.log(this.buffers);
        if(n > this.length) { // 大于缓存容量
            this.highWaterMark = computeNewHighWaterMark(n);
            this.emittedReadable = true;
            this._read();
        }
        let buffer = null;
        if(n > 0 && n < this.length) { // 从缓存中取
            buffer = Buffer.alloc(n);
            let flag = true,
                buf,
                index = 0; // 累计记录长度
            while(flag && (buf = this.buffers.shift())) {
                console.log("b: ",buf);
                for (let i = 0; i < buf.length; i++) {
                    buffer[index++] = buf[i];
                    if(index === n){ // 读够了
                        flag = false;
                        // 更新缓存区长度
                        this.length -= n;
                        // 截取当前已读的部分
                        let buffers = buf.slice(i + 1);
                        if(buffers.length > 0) {
                            this.buffers.unshift(buffers);
                        }
                        break;
                    }
                }
            }
        }   

        if(this.length === 0) { // 缓存区为空
            this.emittedReadable = true;
        }
        // 没有初始化, 开始初始化缓存区
        if(this.length < this.highWaterMark) {
            this.reading = true;
            this._read();
        }
        return buffer && buffer.toString(this.encoding);
    }

    _read() {
        if(typeof this.fd !== "number") {
            return this.once("open", () => this._read());
        }
        
        fs.read(this.fd, this.buffer, 0, this.buffer.length, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) {
                // 更新缓存区
                this.buffers.push(this.buffer.slice(0, bytesRead));
                this.pos += bytesRead;
                // 更新缓存区长度
                this.length += bytesRead;
                this.reading = false;

                // 是否需要触发 readable 事件
                if(this.emittedReadable) {
                    this.emittedReadable = false;
                    this.emit('readable');
                }
            } else { // 什么也没有读到
                this.emit("end");
                this.destroy();
            }   
        });
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if(err) {
                this.emit('error', err);
                if(this.autoClose) {
                    this.destroy();
                }
                return;
            }
            this.fd = fd;
            this.emit("open");
        });
    }

    destroy() {
        if(typeof this.fd !== "number") {
            this.emit("close");
            return;
        }
        fs.close(this.fd, () => {
            this.emit("close");
        });
        
    }
}

module.exports = ReadStream;