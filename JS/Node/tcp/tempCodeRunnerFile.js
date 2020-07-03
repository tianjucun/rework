let net = require("net");
let path = require("path");
let fs = require("fs");

let ws = fs.createWriteStream(path.join(__dirname, "./file/msg.txt"));
// socket 双工流
var server = net.createServer(function(socket) {
    // 暂停读取
    socket.pause();

    socket.pipe(ws);

    // setTimeout(function() {
    //     socket.pipe(ws);
    // }, 5 * 1000) 

});
server.listen(8080);