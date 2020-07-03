var co = require("./co.js");
var fs = require("fs");
var path = require("path");


function* gen() {
    
    // var readData = yield readFilePromise("./file/data.txt");
    // var writeData = yield writeFilePromise("./file/data3.txt", readData);
    
    var writeData = yield* copy("./file/data.txt", "./file/data3.txt");

    var writeData2 = yield* copy("./file/data2.txt", "./file/data4.txt");

    return [writeData, writeData2];
}

function* copy(fromPath, to) {
    var readData = yield readFilePromise(fromPath);
    var writeData = yield writeFilePromise(to, readData);
    return writeData;
}

// 调用 CO 模块执行 Generator 函数 gen
var resultPromise = co(gen);
console.log(resultPromise);
resultPromise.then(function(value) {
    console.log("fulfilled: ", value);
}, function(reason) {
    console.log("rejected: ", reason);
});

function readFilePromise(relativePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, relativePath), function(err, data) {
            if(err) reject(err);
            resolve(data);
        })
    })
}

function writeFilePromise(relativePath, data) {
    return new Promise(function(resolve, reject){
        fs.writeFile(path.join(__dirname, relativePath), data,function(err) {
            if(err) reject(err);
            resolve(data.toString());
        });
    });
}

function fnToTrunk(fn) {
    return function(...args){
        return function(callback) {
            return fn.call(this, args, callback);
        }
    }
}


/**
 *  判断是否到结束位置， 调整指针
 * 
 * @param {*} gen 
 */
function run(gen) {
    var g = gen();
    function next(data) {
        var result = g.next(data);
        if(result.done) return;
        result.value.then(function(data) {
            next(data);
        });
    }
    next();
}







