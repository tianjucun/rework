const PENDING = "pending";
const SUCCESS = "fulfilled";
const FAIL = "rejected";
var nativePromise = Promise;
function Promise(executor) {
    let _this = this;
    // 初始化状态信息
    _this.status = PENDING;
    // 成功接收的值
    _this.value = undefined;
    // 失败接收的值
    _this.reason = undefined;
    // 成功后的处理回调
    _this.onResolveCallbacks = [];
    // 失败后的处理回调
    _this.onRejectedCallbacks = [];

    var resolve = function (value) {
        // 只有状态为 pending 的时候才可以向后切换
        if (_this.status === PENDING) {
            _this.status = SUCCESS;
            _this.value = value;
            _this.onResolveCallbacks.forEach(fn => fn());
        }
    };

    var reject = function (reason) {
        if (_this.status === PENDING) {
            _this.status = FAIL;
            _this.reason = reason;
            _this.onRejectedCallbacks.forEach(fn => fn());
        }
    };

    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

// then
Promise.prototype.then = function (onFulfilled, onRejected) {
    // If onFulfilled is not a function, it must be ignored.
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) {
        return value;
    };

    // If onRejected is not a function, it must be ignored.
    onRejected = typeof onRejected === "function" ? onRejected : function (err) {
        throw err;
    };

    var _this = this;

    var promise2 = new Promise(function (resolve, reject) {
        if (_this.status === SUCCESS) {
            // it must be called after promise is fulfilled, with promise’s value as its first argument.

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
                    reject(e);
                }
            });
        }

        if (_this.status === PENDING) {
            _this.onResolveCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });

            _this.onRejectedCallbacks.push(function () {
                setTimeout(function () {
                    try {
                        let x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    });

    return promise2; // then must return a promise [3.3].
}


function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        // If promise and x refer to the same object, reject promise with a TypeError as the reason.
        return reject(new TypeError("A circular call occurs"));
    }

    if (x != null && (typeof x === "object" || typeof x === "function")) { // if x is an object or function,
        var called;
        try {
            // x 
            var then = x.then;
            if (typeof then === "function") {
                then.call(x, function (y) {
                    if (called) return;
                    called = true
                    // If/when resolvePromise is called with a value y, run [[Resolve]](promise, y).
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    // If/when rejectPromise is called with a reason r, reject promise with r.
                    if (called) return;
                    called = true;
                    reject(r);
                });

            } else {
                resolve(x);
            }
        } catch (e) {
            // If resolvePromise or rejectPromise have been called, ignore it.
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }

}
// var p = new Promise(function (resolve, reject) {
//     resolve("resolve");
// });

// p.then(null, null).then(data => {
//     console.log('data: ', data)
//   }, err => {
//     console.log('error: ', err)
//   });

// 测试产生循环调用的例子
var p3 = new Promise(function (resolve, reject) {
    // setTimeout(() => {
    //     resolve(p3);
    // })
    return p3;
});
var p2 = new Promise(function (resolve, reject) {
    // resolve(p3);
    return p3;
})
p2.then(value => {
    console.log(value);
}, reason => {
    console.log(reason);
});


// resolve

Promise.resolve = function (value) {
    return new Promise(function (resolve, reject) {
        resolve(value);
    })
}

Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    });
}

Promise.prototype.catch = function (reject) {
    return this.then(null, reject);
}

Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  };

// 只要有一个promise 成功就算成功
// Promise.race 的实现原理就在与 当其中一个promise变为 fulfilled 时, 其他调用也就没有什么意义了
Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for (var i = 0, len = promises.length; i < len; i++) {
            promises[i].then(resolve, reject);
        }
    });
}

// 遍历 promise , resolve 一次就记录一次, 等记录的次数达到 promises.length 时就实现最终 resolve
Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
        // 存储resolve成功的结果
        var arr = [];
        var resolveIndex = 0;

        function processData(index, y) {
            arr[index++] = y;
            if (index === promises.length) {
                resolve(arr);
            }
        }

        for (var i = 0, len = promises.length; i < len; i++) {
            promises[i].then(function (value) {
                processData(i, value);
            }, reject);
        }

    });
}

/**
 * 异步方法异步执行，同步方法同步执行
 *    
 *    其原理就是外部包裹一个Promise, 因为 Promise构造函数时同步执行, 
 * 
 *          所以对于同步代码同步执行, 
 *      
 *          对于异步函数, 同步调用, 异步执行
 *    
 */
Promise.try = function (fn, _this, ...args) {
    if (typeof fn === "function") {
        return Promise(function (resolve, reject) {
            resolve(fn.call(_this, ...args));
        });
    } else {
        return Promise.try(() => { throw (new TypeError("fn is not a function")) });
    }
}

// 执行测试用例需要用到的代码
/**
 * https://github.com/promises-aplus/promises-tests
 * npm i promises-aplus-tests
 * promises-aplus-tests promise.js
 */
Promise.deferred = function () {
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
try {
    module.exports = Promise
} catch (e) { }