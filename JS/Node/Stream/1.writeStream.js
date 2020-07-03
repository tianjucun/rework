
/**
 * 通过调用 write 方式实现数据的写入
 * 
 *      刚进来, 会直接调用 _write 进行底层写入, 通过调用 clearBuffer 方法时从缓存区中拉取等待写入的数据
 * 
 *      频繁调用 write, 如果上次write没有写完, 则会之间放到缓存中进行缓存，并通过 clearBuffer 方法进行写入闭环处理
 * 
 *  闭环操作:
 *      缓存 => 写入 
 *      写入=> 更新缓存 => 是否超过 highWaterMark 或者缓存区没有可写入的对象, 触发 drain事件
 *      drain事件触发 => 继续写入缓存(人为判断)
 *      缓存 => 写入
 *         
 * 
 */

let EventEmitter = require("events");
let fs = require("fs");

class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();
        // 写入的路径
        this.path = path;
        // 缓存区的最高水位线, 默认为 16K
        this.highWaterMark = options.highWaterMark || 16 * 1024;
        // 遇到错误是否自动关闭文件
        this.autoClose = options.autoClose || true;
        // 权限标识符
        this.mode = options.mode || 0o666;
        // 开始写的位置 默认为0
        this.start = options.start || 0;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';

        // 可写流 要有一个缓存区, 当正在写入文件时, 内容要写入到缓存区中

        this.buffers = [];

        // 标识 是否正在写入
        this.writing = false;

        // 是否满足触发drain事件
        this.needDrain = false;

        // 记录写入的位置
        this.pos = this.start;

        // 记录缓存区的大小
        this.length = 0;

        this.open();
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if(err) {
                this.emit('error', err);
                if(this.autoClose) {
                    this.destroy();
                }
                return;
            }
            this.fd = fd;
            this.emit('open');
        });
    }

    destroy() {
        if(typeof this.fd !== 'number') {
            return this.emit('close');
        }
        fs.close(this.fd, () => {
            this.emit('close');
        });
    }

    write(chunk, encoding = this.encoding, callback = () => {}) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
   
        // 修改缓存区的大小
        this.length += chunk.length;  
        
        // 比较是否达到了最高水位线
        let ret = this.length < this.highWaterMark;
        
        // 是否需要触发 drain事件
        this.needDrain = !ret;

        // 判断是否正在写入, 如果是正在写入， 就写入到缓存中

        if(this.writing) {
            this.buffers.push({
                encoding,
                chunk,
                callback
            });
        } else {
            this.writing = true;
            this._write(chunk, encoding, () => {
                callback();
                this.clearBuffer();
            });
        }
        return ret;
   }

   clearBuffer() {
    let buffer = this.buffers.shift();
    if(buffer) {
        // 从缓存中取出直接去写
        this._write(buffer.chunk, buffer.encoding, () => {
            buffer.callback();
            this.clearBuffer();
        })
    }else{
        this.writing = false;
        if(this.needDrain){
            this.needDrain = false; 
            this.emit('drain'); // 发送drain事件
        }
    }
   }

   _write(chunk, encoding, callback) {
    if(typeof this.fd !== "number") {
        return this.once("open", () => {
            return this._write(chunk, encoding, callback);
        });
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, byteWritten) => {
        this.length -= byteWritten; // 修改缓存区长度
        this.pos += byteWritten; // 移动指针
        console.log("write");
        callback();
    });
   }

}

module.exports = WriteStream;