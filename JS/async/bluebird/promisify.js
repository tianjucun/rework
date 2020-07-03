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

function promisifyAll(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key) && typeof obj[key] === "function") {
            obj[key + "Async"] = promisify(obj[key])
        }
    }
}


promisifyAll(fs);
fs.readFileAsync(path.join(__dirname, "./data.txt"), "utf8").then(value => console.log(value));


