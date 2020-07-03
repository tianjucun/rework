const PENGING = "pending";
const SUCCESS = "fulfilled";
const FAIL = "rejected";

var nativePromise = Promise;

function Promise(executor) {
    let _this = this;
    // 初始化状态信息
    _this.status = PENGING;
    // 成功接收的值
    _this.value = undefined;
    // 失败接收的值
    _this.reason = undefined;
    // 成功后处理的回调
    _this.onResolveCallbacks = [];
    // 失败后处理的回调
    _this.onRejectedCallbacks = [];

    let resolve = function(value) {
        // 只有状态为 pending 的时候才可以向后切换
        if(_this.status === PENGING) {
            _this.status = SUCCESS;
            _this.value = value;
            _this.onResolveCallbacks.forEach(fn => fn());
        }
    }

    let  reject = function(reason) {
        // 只有状态为 pending 的时候才可以向后切换
        if(_this.status === PENGING) {
            _this.status = FAIL;
            _this.reason = reason;
            _this.onRejectedCallbacks.forEach(fn => fn())
        }
    }

    try{
        executor(resolve, reject)
    }catch(e) { 
        reject(e);
    }
}

// then
Promise.prototype.then = function(onFulfilled, onRejected) {
    // if onFulfilled is not a function. it must be ignored
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;

    // if onRejected is not a function, it must be ignored
    onRejected = typeof onRejected === "function" ? onRejected : reason => {
        throw reason;
    };

    var _this = this;

    var promise2 = new Promise(function(resolve, reject) {
        if(_this.status === SUCCESS) {
            // it must be called after promise is fulfilled, with promise's value as its first arguments
            setTimeout(function() {
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {   
                    reject(e);
                }
            });
        }

        if(_this.status === FAIL) {
            setTimeout(function() {
                try {
                    let x = onRejected(_this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e)
                }
            });
        }

        if(_this.status === PENGING) {
            _this.onResolveCallbacks.push(function() {
                setTimeout(function() {
                    try {
                        let x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                });
            });

            _this.onRejectedCallbacks.push(function() {
                setTimeout(function() {
                    try {
                        let x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e)
                    }
                })
            })
        }
    })
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError("A circular call occurs"));
    }

    if(x != null && (typeof x === "object" || typeof x === "function")) {
        var called;
        try {
            // x
            var then = x.then;
            if (typeof then === "function") {
                then.call(x, function(y) {
                    if(called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function(r) {
                    if(called) return;
                    called = true;
                    reject(r);
                })
            } else {
                resolve(x);
            }
        }catch(e) {
            if(called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

//  resolve

Promise.resolve = function(value) {
    return new Promise(function(resolve, reject) {
        resolve(value);
    });
}

// reject

Promise.reject = function(reason) {
    return new Promise(function(resolve, reject) {
        reject(reason);
    })
}


// catch
Promise.prototype.catch = function(reject) {
    return this.then(null, reject);
}

// finally

Promise.prototype.finally = function(callback) {
    let p = this.constructor;
    return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => {throw reason})
    );
}


// race

Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
        for (var i = 0, len = promises.length; i < len; i++) {
            promises[i].then(resolve, reject)
        }
    });
}

// all
Promise.all = function(promises) {
    return new Promise(function(resolve, reject) {
        var arr = [];
        var resolveIndex = 0;

        function processData(index, y) {
            arr[index++] = y;
            if (index === promises.length) {
                resolve(arr);
            }
        }

        for(var i = 0, len = promises.length; i < len; i++) {
            promises[i].then(value => processData(i, value), reject)
        }
    });
}

// try 
// 异步方法异步执行; 同步方法同步执行; 
// 关键在于将函数的调用放到 resolve 调用时去调用
Promise.try = function(fn, _this, ...args) {
    if (typeof fn === "function") {
        return Promise(function(resolve, reject) {
            resolve(fn.call(_this, ...args));
        })
    } else {
        return Promise.try(() => {
            throw (new TypeError("fn is not a function"))
        });
    }
}

Promise.deferred = function() {
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

try {
    module.exports = Promise
} catch(e) { }


