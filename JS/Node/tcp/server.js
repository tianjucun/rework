 let net = require("net");
 let server = net.createServer({}, function(socket) {
     // { address: '::1', family: 'IPv6', port: 8080 }
    console.log("客户端: ", socket.address()); // 打印地址

    // 设置最大连接数
    server.maxConnections = 2;
    // 获取客户端连接数
    server.getConnections((err, count) => {
        console.log(`当前服务器端连接数: ${count}, 客户端最大连接数: ${server.maxConnections}`);
    });

    socket.setEncoding("utf8");
    // 监听数据
    socket.on("data", function(data) { // 默认返回数据为 Buffer
        console.log("监听到的数据: ", data);
    });
    socket.on("error", function(err) {
        console.log("客户端异常: ", err);
    })
    // 服务器收到客户端发出的关闭连接请求时会触发 end 事件
    socket.on("end", function() {
        console.log("客户端开始关闭");
    })
    // 客户端真正关闭后, 向服务器端发送 close 事件
    socket.on("close", function(hasError) {
        console.log("客户端已关闭, 是否为突然关闭: ",hasError);
    });

    setTimeout(function() { // 在5s之后关掉此服务器不在接收新的请求，对于已连接的客户端仍保持连接
        server.close();
    });
});

 // 服务器监听8080端口
 server.listen(8080, function() {
     console.log("服务器：",server.address());
     console.log("服务器端已经启动");
 });
 server.on("error", function(err) {
     console.log("服务器端异常: ", err);
 });

 // 当server.close调用后, 并且当前服务器端与所有任何客户端连接断开, 会执行关闭事件
 server.on("close", function() {
    console.log("服务器端已关闭");
 });