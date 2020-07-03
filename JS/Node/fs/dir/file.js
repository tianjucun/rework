console.log("[debugger file.js]");
var fs = require("fs");

var path = require("path");

// // 创建目录， 要求父目录必须存在
// // 指定 recursive 属性为 true 启动递归创建
// // 注意：对于 windows, 在根目录上使用 fs.mkdir() （即使使用递归参数）也会导致错误
// fs.mkdir(path.join(__dirname, "../file/a/b/c/e.txt"), {
//     recursive: true
// }, function(err) {
//     if(err) throw err
// });



// // 判断文件是否有权限访问
// // 检查文件是否存在
// fs.access(path.join(__dirname, "../file/c.txt"), fs.constants.F_OK, function(err) {
//     if(err) {
//         console.log("file does not exist");
//     }
// });


// // 获取某目录下所有的文件
// fs.readdir(path.join(__dirname, "../file/"), {
//     encoding: 'utf8',
//     withFileTypes: true
// }, function(err, files){
//     console.log(files);
//     for(var i = 0; i < files.length; i++) {
//         var file = files[i];
//         if(file.isDirectory()) { // 检查时否为文件夹
//             console.log(file.name + " => directory");
//         } else if(file.isFile()) { // 检查时否为文件
//             console.log(file.name + " => file");
//         }   
//     }
// })

// // fs.stat 查看文件目录信息
// /**
//  * stats.size // 文件的大小
//  * stats.atimeMs // access time 上次方式的时间戳
//  * stats.mtimeMs // modified time 上次修改此文件的时间戳
//  * stats.ctimeMs // state change time 上次更新文件状态的事件
//  * 
//  */
// // fs.stat(path.join(__dirname, "../file/a.txt"), function(err, stats) {
// //     console.log(stats);
// //     if(stats.isDirectory()) {
// //         console.log("isDirectory");
// //     }
// //     if(stats.isFile()) {
// //         console.log("isFile");
// //     } 
// // })


// // 移动文件或目录

// fs.rename(path.join(__dirname, "../file/a.txt"), path.join(__dirname, "../file/c/a.txt"), function(err) {
//     if(err) throw err;
//     console.log("移动文件完成");
// })

// 删除文件
// fs.unlink(path.join(__dirname, "../file/b.txt"), function(err) {
//     if(err) throw err;
//     console.log("删除文件成功");
// })

// 截断文件
// var fd = fs.openSync(path.join(__dirname, "../file/c/a.txt"), "r+");
// fs.ftruncate(fd, 4,function(err) {
//     if(err) throw err;
//     console.log("截断文件成功");
// });

// 监视文件 
// fs.watchFile(filename[, options], listener)

