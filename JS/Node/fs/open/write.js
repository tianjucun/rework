var fs = require("fs");

var path = require("path");

fs.open(path.join(__dirname, "../file/b.txt"), 'a', function(err, fd) {
    if(err) {
        console.log("open file error: ", err);
        return;
    }
    fs.write(fd, Buffer.from("探清水河"), function(err, written) {
        if(err) {
            console.log("write file error: ", err);
            return;
        }
        console.log("写入的字节数: ", written); // 12 一个汉字3个字节
    });
});