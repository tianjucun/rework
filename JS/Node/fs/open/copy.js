var fs = require("fs");
var path = require("path");

function copy(src, target, readSize = 1) {
    fs.open(src, "r", function(err, readFd){
        checkError(err);
        fs.open(target, "w", function(err, writeFd) {
            checkError(err);
            let buffer = Buffer.alloc(readSize);
            fs.read(readFd, buffer, 0, readSize, null, function(err, bytesRead){
                checkError(err);
                let readBuffer = buffer.slice(0, bytesRead);
                fs.write(writeFd, Buffer.from(readBuffer), function(err, written){
                    checkError(err);
                    console.log("写入的字节：", written);
                });
            });
        });
    });
}

function checkError(err) {
    if(err) {
        throw new Error("Failed to open or operate file");
    }
}

copy(path.join(__dirname, "../file/b.txt"), path.join(__dirname, "../file/a.txt"), 3);