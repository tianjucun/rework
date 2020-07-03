var fs = require("fs");
var path = require("path");

/**
 * 异步读取文件, 回调函数中第一个参数总为发生错误时的错误对象
 */
var absolutePath = path.join(__dirname, './file/a.txt'); // 绝对路径
var relativePath = "Node/fs/file/a.txt"; // 注意：相对路径, 是相对于当前进程所在的路径(process.cwd()), 并不是相对当前脚本
fs.readFile(relativePath, {
    flag: 'r',
    encoding: 'utf8'
}, function(err, data) {
    if(err) {
        console.log(err);
        return;
    }
    console.log("异步读取文件: ", data);
})

let data = fs.readFileSync(relativePath, {
    encoding: "utf8"
});
console.log("同步读取文件: ", data);
