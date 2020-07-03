let net = require("net");
let path = require("path");
let fs = require("fs");

let rs = fs.createReadStream(path.join(__dirname, "./file/big.txt"));

net.createServer(function(socket) {
    // 监听可读流
    rs.on("data", function(data) {
        let flag = socket.write(data);
        console.log("写入是否达到最高水平线: ", flag);
        console.log("当前socket缓存的字节数: ", socket.bufferSize);
    });
    // 可以重新开始写的时候触发
    socket.on("drain", function() {
        console.log("缓存中的数据已经发送...");
    });
}).listen(8080);