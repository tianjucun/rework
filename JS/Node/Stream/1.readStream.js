

/**
 * 实现原理：通过监听data事件开启流动模式
 * 
 *   通过 Math.min(highWaterMark, end - start) 获取需要读的字节数
 * 
 */


let EventEmitter = require('events');
let fs = require('fs');
class ReadStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        // 发生错误是否自动关闭文件
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.start = options.start || 0;
        this.end = options.end;
        this.encoding = options.encoding || "utf8";
        
        // 打开文件 
        this.open();

        // 默认为暂停模式
        this.flowing = null; 
        
        // 创建一个buffer，用于接收一次读取的数据
        this.buffer = Buffer.alloc(this.highWaterMark);
    
        this.pos = this.start;

        // 监听新增事件
        this.on("newListener", (eventName, callback) => {
            if(eventName === "data") { // 监听data事件
                this.flowing = true; // 开启流动模式
                // 只要监听data事件 => 读取文件
                this.read();
            }
        });
    }

    read() {
        if(typeof this.fd !== "number") {
            return this.once('open', () => this.read());
        }

        // highWaterMark: 3
        // end - start: 4
        // 读取的数要小于等于 howWaterMark
        let howMuchRead = this.end ? Math.min(this.highWaterMark, this.end-this.start + 1) : this.highWaterMark;
        fs.read(this.fd, this.buffer, 0, howMuchRead, this.pos, (err, bytesRead) => {
            if(bytesRead > 0) {
                this.pos += bytesRead; // 移动指针
                let data = this.buffer.slice(0, bytesRead).toString(this.encoding);
                this.emit('data', data);

                // 当读取的位置 大于了end,表示读完了
                if(this.pos > this.end) {
                    this.emit('end');
                    this.destroy();
                }

                if(this.flowing) { // 流动模式下继续读
                    this.read();
                }
            } else { // 什么也没有读到
                this.emit('end');
                this.destroy();
            }
        });
    }

    pipe(ws) { // 边读边写
        this.on('data', chunk => {
            let flag = ws.write(chunk);
            if(!flag) { // 当达到写入的缓存时, 停止写入, 等待 drain 事件
                this.pause();
            }
        });
        ws.on("drain", () => {
            this.resume();
        });
    }

    resume() {
        this.flowing = true;
        this.read();
    }

    pause() {
        this.flowing = false;
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if(err) {
                this.emit("error", err);
                if(this.autoClose) {
                    this.destroy();
                }
                return;
            }
            this.fd = fd;
            this.emit('open'); // 发送open事件 => 标识打开文件了
        });
    }

    destroy() {
        if(typeof this.fd !== "number") {
            this.emit('close');
            return;
        }
        fs.close(this.fd, () => {
            this.emit('close');
        });
    }

}
module.exports = ReadStream
