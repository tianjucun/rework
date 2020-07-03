console.log("[debugger rmdir.js]");
let fs = require("fs");
let path = require("path");

/**
 * 递归删除目录
 * 
 *  1. 如果目录下有文件, 则先删除文件
 * 
 *  2. 如果目录为空了，则删除对应的目录
 * 
 *  3. 递归以上操作
 * 
 *  4. 重要操作：删除下面所有的子文件=> 清空当前文件夹
 * 
 */

 function rmdirSync(dir) {
    try{
        let stat = fs.statSync(dir);
        if(stat.isFile()) {
            fs.unlinkSync(dir);
        } else {    
            let files = fs.readdirSync(dir);
            files.map(file => path.join(dir, file))
                 .forEach(path => rmdirSync(path))
            fs.rmdirSync(dir);
        }
    }catch(e){
        console.log("删除目标文件夹失败: ", e);
    }
 }

//  rmdirSync(path.join(__dirname, "./label"));

/**
 * Promise 并行异步删除目录
 * @param {*} dir 
 */
function rmdirPromise(dir) {
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stat) => {
            if(err) throw err;
            if(stat.isFile()) {
                fs.unlink(dir);
            } else {
                fs.readdir(dir, (err, files) => {
                    let paths = files.map(file => path.join(dir, file));
                    let promises = paths.map(path => rmdirSync(path));
                    Promise.all(promises).then(() => fs.rmdir(dir, resolve))
                });
            }
        });
    });
} 
// rmdirPromise(path.join(__dirname, "./label")).then(res => {
//     console.log("Promise 并行异步删除目录成功!!!");
// });

/**
 * 手动操作指针, 串行删除目录
 * 第一次callback为自定义callback
 */

 function rmdirAnsynSeries(dir, callback) {
    fs.stat(dir, (err, stat) => {
        if(err) throw err;
        if(stat.isFile()) {
            fs.unlink(dir, callback);
        } else {
            fs.readdir(dir, (err, files) => {
                let paths = files.map(file => path.join(dir, file));
                function next(i) {
                    // 当指针大于文件的长度时表示当前目录已经遍历完
                    if(i >= files.length) return fs.rmdir(dir, callback);
                    // 获取当前文件所在的路径
                    let current = paths[i];
                    rmdirAnsynSeries(current, () => {
                        next(++i); // 删除一个文件或者文件夹就拨动一次指针
                    });
                }
                next(0);    
            });
        }
    });
 }

//  rmdirAnsynSeries(path.join(__dirname, "./label"), function(err) {
//      console.log(" 串行删除目录成功!!!");
//  });




 /**
  * 通过 done函数 实现并行删除目录
  * 
  */
 function rmdirAsyncParallel(dir, callback) {
    fs.stat(dir, (err, stat) => {
        if(stat.isFile()) {
            stat.unlink(dir, callback);
        } else {
            fs.readdir(dir, (err, files) => {
                let paths = files.map(file => path.join(dir, file));
                if(paths.length > 0) {
                    let i = 0;
                    function done() { 
                        if(++i >= paths.length) {  // 判断当前文件夹是否已经被清空
                            fs.rmdir(dir, callback);
                        }
                    }
                    // 并行
                    paths.forEach(path => rmdirAsyncParallel(path, done)); // 每删除一个文件或文件夹判断是否可以清空文件夹
                } else {
                    fs.rmdir(dir, callback);
                }
            });
        }
    })
 }

//  rmdirAsyncParallel(path.join(__dirname, "./label"), function(err) {
//          console.log(" 并行删除目录成功!!!");
// });


/**
 * 同步删除目录广度优先
 * 
 * 遍历同级目录同时, 将遍历到的对应的子级目录放到同级目录的后面
 */

 function rmdirWideSync(dir, callback) {
    let arr = [dir],
        i = 0;
    while(arr[i]){
        let current = arr[i++];
        let stat = fs.statSync(current);
        if(stat.isDirectory) {
            let dirs = fs.readdirSync(current);
            arr = [...arr, ...dirs.map(p => path.join(current, p))];
        }
    }
    let p;
    while(null != (p = arr.pop())) {
        let stat = fs.statSync(p);
        if(stat.isDirectory) {
            fs.rmdirSync(p);
        } else {
            fs.unlinkSync(p);
        }
    }
    typeof callback === "function"  && callback();
 }

//  rmdirWideSync(path.join(__dirname, "./label"), function(err) {
//     console.log(" 通过广度优先的方式同步删除目录成功!!!");
// });


/**
 * 异步实现的主要核心点在于如何 在异步中实现循环(串行)
 * @param {*} dir 
 * @param {*} callback 
 */
function rmdirWideAsync(dir, callback) {
    let arr= [dir],
        i = 0;

    function rmdir() {
        let current = arr.pop();
        if(current) {
            fs.stat(current, (err, stat) => {
                if(stat.isDirectory()){
                    fs.rmdir(current, rmdir);
                } else {
                    fs.unlink(current, rmdir);
                } 
            });
        } 
        typeof callback === "function" && callback();
    }
    
    /**
     * 通过回调拨动指针的方式实现异步循环
     */
    !function next() {
        let current = arr[i++];
        if(current) {
            fs.stat(current, (err, stat) => {
                if(stat.isDirectory()) {
                    fs.readdir(current, (err, files) => {
                        arr = [...arr, ...files.map(file => path.join(current, file))]
                    });
                } else { // 为文件的话直接调动指针
                    next();
                }
            })
        } else {
            rmdir();
        }
    }()
}

 rmdirWideAsync(path.join(__dirname, "./label"), function(err) {
    console.log(" 通过广度优先的方式异步删除目录成功!!!");
});

