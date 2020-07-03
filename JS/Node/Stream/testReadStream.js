var path = require("path");
var ReadStream = require("./1.readStream.js");
var WriteStream = require("./1.writeStream.js");

var rs = new ReadStream(path.join(__dirname, "./file/a.txt"), {
    encoding: "utf8",
    start: 2,
    end: 10,
    highWaterMark: 3
});

// rs.on("data", function(data) {
//     console.log("[Read: ]", data);
// });
rs.on("error", function(err) {
    console.log("[Error: ]", err);
});


// pipe
var ws = new WriteStream(path.join(__dirname, "./file/b.txt"),  {
    encoding: "utf8",
    highWaterMark: 3
});
rs.pipe(ws);