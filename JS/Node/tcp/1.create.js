let path = require("path");
let fs = require("fs");

// 快速向一个文件写入 256M数据
let buffer = Buffer.alloc(256 * 1024 * 1024, 6); 
fs.writeFileSync(path.join(__dirname, "./file/big.txt"), buffer)
