var path = require("path");
var fs = require("fs");

function* gen() {
    let data1 = yield readFilePromise("./file/data.txt");
    console.log("data1:", data1);
    let data2 = yield readFilePromise("./file/data2.txt");
    console.log("data2:", data2);
}


function readFilePromise(relativePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname,relativePath), function(err, data) {
            if(err) reject(err);
            resolve(data.toString());
        });
    });
}


co(gen)

function co(gen) {
    var ctx = this;
    var args = [].slice.call(arguments, 1);

    return new Promise(function(resolve, reject) {
        if(typeof gen === "function") {
            gen = gen.apply(ctx, args);
        }

        onFulfilled();

        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch(e) {
                reject(e);
            }
            next(ret);
        }

        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch(e) {
                reject(e)
            }
            next(ret);
        }

        function next(ret) {
            if(ret.done) return resolve(ret.value);
            return ret.value.then(onFulfilled, onRejected);
        }

    });
}