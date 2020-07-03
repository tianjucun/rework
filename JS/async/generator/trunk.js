var path = require("path");
var fs = require("fs");


/**
 * 
 * Trunk 函数: 将多参函数替换为一个只接受回调参数作为参数的单参数函数
 * 
 * @param {*} fileName 
 */


// Trunk 函数的简单实现
var Trunk = function(fileName) {
    return function(callback) {
        return fs.readFile(fileName, callback);
    }
} 

// var readFileTrunk = Trunk(path.join(__dirname, "./file/data.txt"));
// readFileTrunk(function(err, data) {
//     if(err) throw err;
//     console.log("读到的数据: ", data.toString());
// });

// TrunkUtils
var TrunkByES5 = function(fn) {
    return function() {
        var args = [].slice.call(arguments); // 获取第一个函数的所有入参
        return function(callback) { 
            args.push(callback); // 添加回调函数
            return fn.apply(this, args);
        }
    }
};

// var readFileTrunk = TrunkByES5(fs.readFile);
// readFileTrunk(path.join(__dirname, "./file/data.txt"))(function(err, data) {
//     if(err) throw err;
//     console.log("读到的数据: ", data.toString());
// });


var TrunkByES6 = function(fn) {
    return function(...args) {
        return function(callback) {
            return fn.apply(this, [...args, callback]);
        }
    }
}

// var readFileTrunk = TrunkByES6(fs.readFile);
// readFileTrunk(path.join(__dirname, "./file/data.txt"))(function(err, data) {
//     if(err) throw err;
//     console.log("读到的数据: ", data.toString());
// });


// Tunkify 

function trunkify(fn) {
    return function() {
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }

        return function(done) {
            var called;
            args.push(function() { // 保证回调只执行一次
                if(called) return
                called = true;
                done.apply(null, arguments);
            });
            
            try{
                fn.apply(ctx, args); 
            } catch (err){
                done(err);
            }
        }
    }
}

// var readFileTrunk = trunkify(fs.readFile);
// readFileTrunk(path.join(__dirname, "./file/data.txt"))(function(err, data) {
//     if(err) throw err;
//     console.log("读到的数据: ", data.toString());
// });


// 手动执行 Generator 函数

// var readFileTrunk = trunkify(fs.readFile);

// var g = function* (){
//     var r1 = yield readFileTrunk(path.join(__dirname, "./file/data.txt"));
//     console.log("r1: ", r1.toString());
//     var r2 = yield readFileTrunk(path.join(__dirname, "./file/data2.txt"));
//     console.log("r2: ", r2.toString());
// };
// var gen = g();
// var r1 = gen.next();
// r1.value(function(err, data) {
//     if(err) throw err;
//     var r2 = gen.next(data);
//     r2.value(function(err, data) {
//         if(err) throw err;
//         gen.next(data);
//     })
// });

// 自动执行管理

function run(gen) {
    var g = gen();

    function next(err, data) {
        if(err) throw err;
        var result = g.next(data);
        if(result.done) return;
        result.value(next);
    }
    next(); // 初始化 generator 函数
}


var readFileTrunk = trunkify(fs.readFile);
var writeFileTruk = trunkify(fs.writeFile);

/**
 * 实现将 data文件内容读出来  ===写入==> data3
 * 实现将 data2文件内容读出来  ===写入==> data4
 */
var g = function* (){
    var r1 = yield readFileTrunk(path.join(__dirname, "./file/data.txt"));
    console.log("r1: ", r1.toString());
    var w1 = yield writeFileTruk(path.join(__dirname, "./file/data3.txt"), r1.toString());
    console.log("w1: ", w1);
    var r2 = yield readFileTrunk(path.join(__dirname, "./file/data2.txt"));
    console.log("r2: ", r2.toString());
    var w2 = yield writeFileTruk(path.join(__dirname, "./file/data4.txt"), r2.toString());
    console.log("w2: ", w2);
};

run(g);









