// LineReader 行读取器
let fs = require('fs');
let EventEmitter = require('events');
console.log(EventEmitter);
// 在window下 换行回车是\r\n 0x0d 0x0a ASCII
// 在mac下 只是\n
let path = require('path');
class LineReader extends EventEmitter {
    constructor(path) {
        super();
        this.RETURN = 0x0d;
        this.LINE = 10;
        this.buffer = [];
        this._rs = fs.createReadStream(path); // 默认情况下会先读highWaterMark
        this.on('newListener', (eventName) => {
            if (eventName === 'line') {
                this._rs.on('readable', () => {
                    let char;
                    // 读出来的内容都是buffer类型
                    while (char = this._rs.read(1)) {
                        let current = char[0];
                        switch (current) {
                            // 当碰到\r时表示这一行ok了
                            case this.RETURN:
                                this.emit('line', Buffer.from(this.buffer).toString());
                                this.buffer.length = 0;
                                let c = this._rs.read(1);
                                // 读取\r后 看一下下一个是不是\n 如果不是就表示他是一个正常的内容
                                if (c[0] !== this.LINE) {
                                    this.buffer.push(c[0]);
                                }
                                break;
                            case this.LINE:// mac只有\r 没有\n
                                this.emit('line', Buffer.from(this.buffer).toString());
                                this.buffer.length = 0;
                            default:
                                this.buffer.push(current);
                        }
                    }
                });
                this._rs.on('end', () => {
                    this.emit('line', Buffer.from(this.buffer).toString());
                    this.buffer.length = 0
                });
            }
        })
    }
}
let lineReader = new LineReader(path.join(__dirname, './2.txt'));
lineReader.on('line', function (data) {
    console.log(data); // abc , 123 , 456 ,678
})