let fs = require("fs");
let path = require("path");
// 写
var ws = fs.createWriteStream(path.join(__dirname, "./file/a.txt"), {
    flags: 'w', // 文件系统标识符
    encoding: 'utf8', // 
    fd: null, // 默认为null，如果指定了fd，则 WriteStream 将会忽略 path 参数并将会使用指定的文件描述符
    mode: 0o666,
    autoClose: true, // autoClose 用来保证在 'error' 或者'finish'事件触发后将会自动关闭文件描述符（自动关闭文件系统 fs.close）
    emitClose: false, // 默认情况下流在销毁后不去触发 'close' 事件    
    start: 0, // 自定义开始的写入位置 允许的值: [0, Number.MAX_SAFE_INTEGER] 
    highWaterMark: 6 // 用来配置缓存区的最高水位线
});

ws.on("error", function(err) { // 如果在写入管道数据时发生错误(场景: 打开文件, 写入文件), 将会触发该事件
    console.log(err);
});
ws.on("finish", function() { // 调用 end 且缓冲数据都已传给底层系统之后触发 
    console.log("写入完毕!!!");
});


/**
 * 关于 write 方法的使用
 *   
 *   1. write 用来写入数据到流 (写入到缓存中(当达到一定的highWaterMark时就会全部写入内存))
 *   
 *   2. write 的返回值, 如果缓存中的数据大于 highWaterMark 时将返回false, 否则返回true
 * 
 *   3. 对于 write 返回值为false的处理建议: 虽然写入的数据并不会丢失, 但是在操作大量数据时建议当drain事件触发后再去进行写入
 * 
 *   4. 关于drain事件：当可以继续写入数据到流时会触发drain事件（当缓存被清空时）
 */

function write(i = 10) {
    for(var i = i; i >= 0; i--) {
        let flag = ws.write(i + (!i ? "" : ","));
        console.log("[write: " + i +"]","-",flag);
        if(!flag) {
           ws.once("drain", function() {
               write(i - 1);
           });
           break;     
        }else if(!i) { 
            ws.end('[complete]'); // 表明已没有数据可写入
        }
    }
}
write();

