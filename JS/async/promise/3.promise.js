const PENDING = "pending";
const SUCCESS = "fulfilled";
const FAIL = "rejected";

const nativePromise = Promise;

function Promise(executor) {
    let _this = this;
    // 初始化 status
    _this.status = PENDING;
    // 初始化 value
    _this.value = undefined;
    // 初始化 reason
    _this.reason = undefined;
    // 初始化 onResolveCallbacks
    _this.onResolveCallbacks = [];
    // 初始化 onRejectedCallbacks
    _this.onRejectedCallbacks = [];

    let resolve = function(value) {
        if(_this.status === PENDING) {
            _this.status = SUCCESS;
            _this.value = value;
            _this.onResolveCallbacks.forEach(fn => fn());
        }
    }
    let reject = function(reason) {
        if(_this.status === PENDING) {
           _this.status = FAIL;
           _this.reason = reason;
           _this.onRejectedCallbacks.forEach(fn => fn()); 
        }
    }
    try {
        return executor(resolve, reject);
    } catch(e) {
        reject(e);
    }
}


Promise.prototype.then = function(onFulfilled, onRejected) {
    
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;

    onRejected = typeof onRejected === "function" ? onRejected : reason => {
        throw reason;
    }

    let _this = this;

    let promise2 = new Promise(function(resolve, reject) {
        if(_this.status === SUCCESS) {
            setTimeout(function() {
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(promise2, x, resolve, reject);
                }catch(e) {
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
                    reject(e);
                }
            });
        }
        if(_this.status === PENDING) {
            _this.onResolveCallbacks.push(function() {
                setTimeout(function() {
                    try {
                        let x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e) {
                        reject(e);
                    }
                });
            });

            _this.onRejectedCallbacks.push(function() {
                setTimeout(function() {
                    try {
                        let x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }catch(e) {
                        reject(e);
                    }
                })
            })
        }
    });
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject(new TypeError("发生循环引用...."));
    }

    if(x!=null && (typeof x === "object" || typeof x === "function")) {
        let called;
        try {
            let then = x.then;
            if(typeof then === "function") {
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
        resolve(x)
    }
}

// resolve
Promise.resolve = function(value) {
    return new Promise(function(resolve, reject) {
        resolve(value);
    })
}

// reject
Promise.reject = function(reason) {
    return new Promise(function(resolve,reject){
        reject(reason);
    })
}


// try
Promise.try = function(fn, _this, ...args) {
    if(typeof fn === "function") {
        return new Promise(function(resolve, reject) {
            resolve(fn.call(_this, ...args));
        });
    } else {
        return Promise.try(() => {
            throw new TypeError("fn is not a function");
        });
    }
}   

// catch
Promise.prototype.catch = function(reject) {
    return this.then(null, reject);
}

// finally
Promise.prototype.finally = function(cb) {
    let P = this.constructor;
    return this.then(
        P.resolve(cb()).then(value => value),
        P.resolve(cb()).then(reason => {
            throw reason;
        })
    );
}

// race

Promise.race = function(promises) {
    return new Promise(function(resolve, reject) {
        for(var i = 0, len = promises.length; i < len ;i++) {
            promises[i].then(resolve, reject);
        }
    })
}


// all

Promise.all = function(promises) {

    return new Promise(function(resolve, reject) {
        let arr = [];
        let resolveIndex = 0;
        
        function processData(value){
            arr[resolveIndex++] = value;
            if(resolveIndex === promises.length) {
                resolve(arr);
            }
        }

        for(var i = 0, len = promises.length; i < len; i++) {
            promises[i].then(value => processData(value), reject);
        }
    });
}









Promise.deferred = function() {
    let defer = {};
    defer.promise = new Promise(function(resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}

try {
    module.exports = Promise;
} catch (e) { }

