console.log("[debugger mkdir.js]");

var fs = require("fs");
var path = require("path");

// 同步创建目录

// 在使用相对路径时时否相对当前路径
function mkdirSync(dir, isCurr) {
    // 获取所有路径的集合, 通过path.sep分割出所有的目录名
    let paths = path.join(dir).split(path.sep);
    // 遍历所有的目录名字
    for(let i = 1; i <= paths.length; i++) {
        let dir = paths.slice(0, i).join(path.sep); // 获取当前目录

        // 如果 isCurr 为true的则生成一个绝对路径, 相对于当前脚本进行生成
        // 在进行入参的时候可以通过 join 的方式将目录数组转为一个字符串路径
        // 也可以选择 直接 (...dir) 入参
        let dirPath = path.join(isCurr ? __dirname : "",dir);  // 通过 path.join 解决相对路径的问题
        console.log("dirPath: ", dirPath);
        try{
            fs.accessSync(dirPath); // 判断文件时否可以访问
        }catch(e) { // 没有访问权限则抛出错误
            fs.mkdirSync(dirPath); // 去创建对应的目录
        }
    }
}

// mkdirSync("./label/a/b", true); // 相对路径相对的是当前进程的路径 process.cwd();
// console.log(process.cwd()); // D:\Udata\rework\0413


/**
 * 异步创建目录
 * 
 */

 function mkdir(dir, isCurr, callback) {
     let i = 1;
     let paths = path.join(dir).split(path.sep);
     function next(err) {
         
        // 文件创建失败的错误处理机制
        if(err) {
            if(typeof callback === "function") {
                callback();
            }else{
                throw err;    
            }   
        } 
        
        if(i > paths.length) { // 检查时否已创建成功
            typeof callback === "function" && callback();
            return;
        }   

        // 执行文件的创建
        let dir = paths.slice(0, i++).join(path.sep);
        let dirPath = path.join(isCurr ? __dirname : "", dir);
        fs.access(dirPath, err => { // 检查文件时否存在
            if(err) { // 不存在则创建
                fs.mkdir(dirPath, next)
            }
        });
     }
     next();
 }

//  mkdir("./label/a/b", true, function() {
//      console.log("异步递归创建文件夹成功!!!");
//  });


var mkdirAsync = (function() {
    async function mkdir(dirPath) {
        return new Promise((resolve, reject) => {
            fs.mkdir(dirPath, err => {
                if(err) reject(err)
                else resolve()
            });
        });
    }

    async function access(dirPath) {
        return new Promise((resolve, reject) => {
            fs.access(dirPath, err => {
                if(err) reject(err)
                else resolve();
            })
        });
    }

    async function excute(dir, isCurr, callback) {
        let paths = path.join(dir).split(path.sep);
        for(let i = 1; i <=paths.length; i++) {
            let dir = paths.slice(0, i).join(path.sep);
            console.log(dir);
            let dirPath = path.join(isCurr ? __dirname : "", dir);
            try {
                await access(dirPath);
            }catch(e) {
                await mkdir(dirPath).catch(err => {
                    if(err) {
                        if(typeof callback === "function") {
                            callback(err);
                            reject(err)
                        }else{
                            throw err;    
                        }   
                    } 
                });
            }
        }
        typeof callback === "function" && callback()
    }
    return excute;
})();

mkdirAsync("./label/a/b/c/d/e/f/g", true, function() {
    console.log("异步递归创建文件夹成功!!!");
});






