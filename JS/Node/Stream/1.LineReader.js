let fs = require("fs");
let EventEmitter = require('events');

let path = require("path");
const RETURN = 0x0d;
const NEW_LINE = 0x0a;


class LineReader extends EventEmitter {
    constructor(path) {
        super();
        this.RETURN = 0x0d;
        this.LINE = 0x0a;
        this.buffer = [];
        this._rs = fs.createReadStream(path);
        this.on('newListener', eventName => {
            if(eventName === 'newLine') {
                this._rs.on('readable', () => {
                    let bytes;
                    while(bytes = this._rs.read(1)) {
                        let ch = bytes[0];
                        switch (ch) {
                            case RETURN :
                                this.emit("newLine", Buffer.from(this.buffer));
                                this.buffer.length = 0;

                                let nByte = this._rs.read(1);
                                if(nByte && nByte[0] != NEW_LINE) {
                                    this.buffer.push(nByte[0]);
                                }
                            break;
                            case NEW_LINE: 
                                this.emit("newLine", Buffer.from(this.buffer));
                                this.buffer.length = 0;
                            break;
                            default: 
                                this.buffer.push(ch);
                            break;
                        }
                    }
                });
                this._rs.on("end", () => {
                    if(this.buffer.length > 0) { // 进行发送
                        this.emit("newLine", Buffer.from(this.buffer));
                        this.buffer.length = 0;
                        this.emit("end"); // 触发自定义end事件
                    }
                });
            }
        });
    }
}

let lineReader = new LineReader(path.join(__dirname, "./file/c.txt"))
lineReader.on("newLine", data => {
    console.log(data.toString());
}).on("end", () => {
    console.log("行读取器执行完毕");
});
