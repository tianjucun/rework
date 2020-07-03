// 实现 Readable 接口
let { Readable } = require('stream');

let index = 9;
class MyRead extends Readable {
    _read() {
        if(index-- >0) return this.push('123'); // 调用 push 方法会发送data事件
        this.push(null); // push null 的时候就会停止发送
    }
}
let mr = new MyRead();
mr.on('data', function(data) {
    console.log(data);
})