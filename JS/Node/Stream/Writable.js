let { Writable } = require("stream");

// 源码中默认调用的是Writable中的write方法
class MyWrite extends Writable {
    _write(chunk, enconding, callback) {
        console.log(chunk.toString("utf8"));
        callback(); // clearBuffer
    }
}

let mw = new MyWrite();
mw.write('Stream', "utf8", () => {
    console.log("完成");
})
mw.write('Fs', "utf8", () => {
    console.log("完成");
})