var fs = require("fs");
var path = require("path");

fs.writeFile(path.join(__dirname, "./file/b.txt"), "阿达",{
    flag: "a",
    enconding: "utf8"
}, function(err) {
    if(err) {
        console.log("写入出错: ", err);
    }
})

/**
 * 同步写入文件
 */
let res = fs.writeFileSync(path.join(__dirname, "./file/b.txt"), "qwe", "utf8");
console.log("同步写入文件结果: ", res); // undefined


