let EventEmitter = require('events');
let fs = require('fs');
class WriteStream extends EventEmitter{
    constructor(path,options){
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark||16*1024;
        this.autoClose = options.autoClose||true;
        this.mode = options.mode;
        this.start = options.start||0;
        this.flags = options.flags||'w';
        this.encoding = options.encoding || 'utf8';

        // 可写流 要有一个缓存区，当正在写入文件是，内容要写入到缓存区中
        // 在源码中是一个链表 => []

        this.buffers = [];

        // 标识 是否正在写入
        this.writing = false;

        // 是否满足触发drain事件
        this.needDrain = false;

        // 记录写入的位置
        this.pos = 0;

        // 记录缓存区的大小
        this.length = 0;
        this.open();
    }
    destroy(){
        if(typeof this.fd !=='number'){
            return this.emit('close');
        }
        fs.close(this.fd,()=>{
            this.emit('close')
        })
    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err){
                this.emit('error',err);
                if(this.autoClose){
                    this.destroy();
                }
                return
            }
            this.fd = fd;
            this.emit('open');
        })
    }
    write(chunk,encoding=this.encoding,callback=()=>{}){
        chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk,encoding);
        // write 返回一个boolean类型 
        this.length+=chunk.length; 
        let ret = this.length<this.highWaterMark; // 比较是否达到了缓存区的大小
        this.needDrain = !ret; // 是否需要触发needDrain
        // 判断是否正在写入 如果是正在写入 就写入到缓存区中
        if(this.writing){
            this.buffers.push({
                encoding,
                chunk,
                callback
            }); // []
        }else{
            // 专门用来将内容 写入到文件内
            this.writing = true;
            this._write(chunk,encoding,()=>{
                callback();
                this.clearBuffer();
            }); // 8
        }
        return ret;
    }
    clearBuffer(){
        let buffer = this.buffers.shift();
        if(buffer){
            this._write(buffer.chunk,buffer.encoding,()=>{
                buffer.callback();
                this.clearBuffer()
            });
        }else{
            this.writing = false;
            if(this.needDrain){ // 是否需要触发drain 需要就发射drain事件
                this.needDrain = false;
                this.emit('drain');
            }
        }
    }
    _write(chunk,encoding,callback){
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>this._write(chunk,encoding,callback));
        }
        fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,byteWritten)=>{
            this.length -= byteWritten;
            this.pos += byteWritten;
            
            callback(); // 清空缓存区的内容
        });
    }
}

module.exports = WriteStream;