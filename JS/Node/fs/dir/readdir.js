console.log("[debugger readdir.js]");
var fs = require("fs");
var path = require("path");

// 同步 + 深度优先遍历

function deepSync(dir) {
    console.log(dir);
    let files = fs.readdirSync(dir);
    files.forEach(file => {
        let p = path.join(dir, file);
        let stat = fs.statSync(p);
        if(stat.isDirectory()) {
            deepSync(p);
        } else {
            console.log(p);
        }
    })
}

// deepSync("Node/fs");
/**
 * 深度异步遍历
 * @param {} dir 
 * @param {*} callBack 
 */
function deep(dir, callBack) {
    console.log(dir);
    fs.readdir(dir, (err, files) => {
        !function next(i) {
            if(i >= files.length) {
                return callBack();
            }
            let file = files[i];
            let p = path.join(dir, file);
            fs.stat(p, (err, stat) => {
                if(stat.isDirectory()) {
                    deep(p, () => next(i+1)); // 深度先序遍历在于遍历完拨动指针
                } else {
                    console.log(p);
                    next(i+1);
                }
            })
        }(0)
    });
}

// deep("Node/fs", function() {
//     console.log("先序遍历完成!!!");
// });


/**
 * 广度同步遍历
 * @param {} dir 
 */
function wideSync(dir) {
    let arr = [dir],
        i  = 0;
    while(arr[i]) {
        let p = arr[i++];
        if(fs.statSync(p).isDirectory()) {
            let files = fs.readdirSync(p);
            arr = [...arr, ...files.map(file => path.join(p, file))]
        }
    }

    let p;
    while(null != (p = arr.shift())) {
        console.log(p);
    }
}

// wideSync("Node/fs");

/**
 * 广度同步遍历
 * [a,b,a.1,a.2,a.3,b.1,b.2,c]
 * @param {*} dir 
 */
function wideSync(dir) {
    let arr = [dir]

    while(arr.length > 0) {
        let p = arr.shift();
        console.log(p);
        let stat = fs.statSync(p);
        if(stat.isDirectory()) {
            let files = fs.readdirSync(p);
            files.forEach(file => {
                arr.push(path.join(p, file));
            });
        }   
    }
}

wideSync("Node/fs");

/**
 * 广度优先遍历
 * @param {*} dir 
 * @param {*} callBack 
 */
function deepWideAsync(dir, callBack) {
    console.log(dir);
    callBack && callBack(); // 关键实现，在遍历前就拨动指针
    fs.readdir(dir, (err, files) => { 
        !function next(i) {
            if(i >= files.length) return;
            let p = path.join(dir, files[i]);
            fs.stat(p, (err, stat) => {
                if(stat.isDirectory()) {
                    deepWideAsync(p, () => next(i + 1))
                } else {
                    console.log(p);
                    next(i+1);
                }
            });
        }(0)
    });
}

deepWideAsync("Node/fs");