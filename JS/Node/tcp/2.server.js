let net = require("net");
let path = require("path");
let fs = require("fs");

let ws = fs.createWriteStream(path.join(__dirname, "./file/msg.txt"));
// socket 双工流
var server = net.createServer(function(socket) {
    // 暂停读取
    socket.pause();

    // 直接pipe 会导致服务器端发一次请求就写入一次
    // socket.pipe(ws);

    // 会在连接后 5s 后写入
    // setTimeout(function() {
    //     // 默认情况下, 当来源可读流触发 'end' 事件时, 目标可写流也会调用 stream.end() 结束写入
    //     console.log("timeout");
    //     socket.pipe(ws, {
    //         end: false // 设置为false, 可以保证可写流一直属于打开状态
    //     });
    // }, 5 * 1000) 

    // 设置抖动延迟事件, 每当客户端停止输入3s后触发timeout事件
    socket.setTimeout(3 * 1000);
    socket.on("timeout", function() {
        console.log("timeout");
        socket.pipe(ws, { // 执行写入事件
            end: false
        });
    });
    // 当服务器端与所有客户端的连接都断开时就会关闭服务器
    server.unref();

});
server.listen(8080);