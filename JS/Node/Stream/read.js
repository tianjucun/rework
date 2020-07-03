let fs = require("fs");
let path = require("path");

// 可读流
let rs = fs.createReadStream(path.join(__dirname, "./file/a.txt"), {
    flags: 'r', // 文件描述符
    encoding: 'utf8',
    fd: null,
    autoClose: true, // autoClose 用来保证在 'error' 或者'finish'事件触发后将会自动关闭文件描述符（自动关闭文件系统 fs.close）
    emitClose: true, // 默认情况下流在销毁后不去触发 'close' 事件    
    start: 0, // 自定义文件读取的开始位置
    end: 5, // 自定已文件的读取结束的位置(注: 包含5), 默认为 当前文件的length
    highWaterMark: 3 // 流动模式下指的时一次多少个字节；暂停模式下指的时缓存区的大小
});
rs.on("open", function() {
    console.log("触发： 打开文件");    
})
rs.on("close", function() {
    console.log("触发: 关闭文件");
});
rs.on("error", function(err) { // 文件打开或读取时报错
    console.log(err);
})
// rs.on("data", function(data) {
//     console.log(data);
// });
rs.on("end", function(){ // 只有数据被完全消费掉才会触发该事件(从start读到end+1 => 文件被完全读完)
    console.log("end");
});
// rs.on("readable", function() {
//     let data = rs.read(1); 
//     console.log(data)
// });


/**
 * 关于读取流的两种读取模式
 * 
 *    1. 流动模式(flowing): 数据自动从底层系统读取，并通过 EventEmitter 接口的事件尽可能快地提供给应用程序
 * 
 *    2. 暂停模式(paused): 必须显示调用 stream.read() 读取数据块
 * 
 * 关于分别如何开启这两种模式
 * 
 *     开启流动模式:
 *          
 *          1. 监听 data 事件
 * 
 *          2. 调用 stream.resume 方法
 * 
 *          3. 调用 stream.pipe 方法(底层其实也是在对 data 事件进行监听)
 * 
 *     开启暂停模式
 * 
 *          1. 监听 readable 事件
 * 
 *          2. 调用 stream.paused 方法
 * 
 * 需要注意的点
 * 
 *          1. 流动模式没有缓冲区，直接从内存进行读
 * 
 *          2. 流动模式下如果不消费目标数据(没有监听 data 事件), 那么数据会发生流失
 *
 */ 

// 实现边读边写模式(pipe)
// let ws = fs.createWriteStream(path.join(__dirname, "./file/b.txt"), {
//     highWaterMark: 3 // 保证速度统一
// });

// rs.on("data", function(data) {
//     console.log(data);
//     let flag = ws.write(data);
//     console.log(flag);
//     if(!flag) {
//         rs.pause(); // 暂停读取 =》 暂停模式
//     }
// });
// ws.on("drain", function(){ // 可以读了
//     console.log("可以开始读了");
//     rs.resume(); // 恢复读取 => 流动模式
// });

// 关于暂停模式的使用
/**
 *  关于 read(n) 函数
 *  
 *  从缓存中读取n个字节数据，并在其后立马检测（只要当前缓存内容数据总长度 小于 highWaterMark 时），
 *  就执行灌数据（直到数据达到了highWaterMark）
 * 
 */
rs.on("readable", function() { // 事件触发场景: 要么有新的数据(返回可用的数据)，要么到达流的尽头(返回null)
    var data = rs.read(3); // 一次读取3个字节
    console.log("读取到的数据: ", data); // 
    console.log(rs.readableHighWaterMark);
    // setTimeout(function() {
    //     console.log(rs.readableHighWaterMark);
    // }, 1000)
});




