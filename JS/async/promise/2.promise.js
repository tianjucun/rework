const PENDING = "pending";
const SUCCESS = "fulfilled"
const FAIL = "rejected";

const nativePromise = Promise;

function Promise(executor) {
    let _this = this;
    // 初始化状态
    _this.status = PENDING;
    // 初始化 value
    _this.value = undefined;
    // 初始化 reason 
    _this.reason = undefined;
    // 初始化 onResolvedCallBacks
    _this.onResolvedCallBacks = [];
    // 初始化 onRejectedCallBacks
    _this.onRejectedCallBacks = [];

    let resolve = function (value) {
        // if status is pending
        if (_this.status === PENDING) {
            _this.status = SUCCESS;
            _this.value = value;
            _this.onResolvedCallBacks.forEach(fn => fn());
        }
    }
    let reject = function (reason) {
        // if status is pending
        if (_this.status === PENDING) {
            _this.status = FAIL;
            _this.reason = reason;
            _this.onRejectedCallBacks.forEach(fn => fn());
        }
    }

    try {
        return executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// then
Promise.prototype.then = function (onFulfilled, onRejected) {
    // if onFulfulled is not a function, ignore it
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;

    // if onRejected is not a function, ignore it
    onRejected = typeof onRejected === "function" ? onRejected : reason => {
        throw reason;
    }

    var _this = this;
    let promise2 = new Promise(function (resolve, reject) {
        if (_this.status === SUCCESS) {
            setTimeout(function () {
                try {
                    let x = onFulfilled(_this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }

            });
        }

        if (_this.status === FAIL) {
            setTimeout(function () {
                try {
                    let x = onRejected(_this.reason);
                    resolvePromise(promise2, x, resolve, reject);

                } catch (e) {
                    reject(e)
                }
            });
        }

        if (_this.status === PENDING) {
            _this.onResolvedCallBacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }

                });
            });

            _this.onRejectedCallBacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }

                })
            });
        }
    });

    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("发生循环引用了...."));
    }

    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        // then
        var called;
        try {
            let then = x.then;
            if (typeof then === "function") {
                then.call(x, function (y) {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

Promise.resolve = function (value) {
    return new Promise(function (resolve, reject) {
        resolve(value);
    });
}

// reject

Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(value);
    })
}

// try 
Promise.try = function (fn, _this, ...args) {
    if (typeof fn === "function") {
        return new Promise(function (resolve, reject) {
            resolve(fn.call(_this, ...args));
        });
    } else {
        return Promise.try(() => {
            throw (new TypeError("fn is not a function"));
        });
    }
}

// catch
Promise.prototype.catch = function (reject) {
    return this.then(null, reject);
}

// finally
Promise.prototype.finally = function (cb) {
    let P = this.constructor;
    return this.then(
        value => P.resolve(cb()).then(() => value),
        reason => P.resolve(cb()).then(() => {
            throw reason;
        })
    );
}

// race
Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for (var i = 0, len = promises.length; i < len; i++) {
            promises[i].then(resolve, reject);
        }
    })
}

// all
Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
        let arr = [];
        let resolveIndex = 0;
        function processData(y) {
            arr[resolveIndex++] = y;
            if (resolveIndex === promises.length) {
                resolve(arr);
            }
        }
        for (var i = 0, len = promises.length; i < len; i++) {
            promises[i].then(value => processData(value), reject);
        }
    })
}

Promise.deferred = function () {
    let defer = {};
    defer.promise = new Promise(function (resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
try {
    module.exports = Promise
} catch (e) { }












