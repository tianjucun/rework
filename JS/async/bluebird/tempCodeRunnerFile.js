function promisify(fn) {
    return function(...args) {
        return new Promise(function(resolve, reject) {
            fn.apply(null, [...args, function(err, data) {
                if(err) reject(err)
                resolve(data)
            }])
        })
    }
}

var path = require("path");
var fs = require("fs");


let readFilePromise = promisify(fs.readFile);
readFilePromise(path.join(__dirname, "./data.txt"), "utf8").then(value => console.log(value));