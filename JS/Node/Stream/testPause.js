let path = require("path");
let ReadStream = require("./1.pause.js");

let rs = new ReadStream(path.join(__dirname, "./file/a.txt"), {
    autoClose: true,
    encoding: "utf8",
    start: 2,
    end: 10,
    highWaterMark: 3
});
rs.on("open", function() {
    console.log("open");
});
rs.on("readable", function() {
    let data = rs.read(1);
    console.log("读取到的数据: ", data);
});
rs.on("error", function(err) {
    console.log("[Error: ]", err);
});