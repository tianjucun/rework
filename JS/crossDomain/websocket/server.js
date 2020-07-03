let express = require("express");
let app = express();
let WebSocket = require("ws");
let wss = new WebSocket.Server({
    port: 8082
});
wss.on("connection", function(ws) {
    ws.on("message", function(data) {
        console.log(data);
        ws.send("bar");
    })
});  