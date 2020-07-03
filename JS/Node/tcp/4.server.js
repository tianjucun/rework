// TCP 聊天室
let net = require("net");

let server = net.createServer(function(socket){
    socket.setEncoding("utf8");
    server.getConnections((err, count) => {
        socket.write("欢迎光临本聊天室, 当前在线人数: ", count, "请设置您的昵称：\r\n");
    });

    // 监听客户端的输入
    let username;
    socket.on("data", function(data) {
        data = data.replace(/\r\n/, "");
        console.log("得到客户端数据: ", data);
        // let flag = socket.write(data);
        if(username) {
            // 已设置username
        } else {
            username = data;
            socket.write("新昵称设置成功, 名字为: ", username);
        }
    });

    socket.on("end", function() {
        console.log("客户端已断开");
    });
});
server.listen(8080, function() {
    console.log("TCP聊天室以及启动, 服务器信息为: ", server.address());
});
