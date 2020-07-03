var path = require("path");
var WritableStream = require("./1.writeStream.js");

var ws = new WritableStream(path.join(__dirname, "./b.txt"), {
    highWaterMark: 3,
    autoClose: true,
    encoding: 'utf8',
    // start: 3,
    mode: 0o666,
});

let flag = ws.write("1123123", "utf8", function() {
    console.log("写入成功");
});
ws.on("open", function() {
    console.log("open");
});
ws.on("error", function(err) {
    console.log("error: ", err);
});
console.log(flag);

