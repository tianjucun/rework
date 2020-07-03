 // 测试循环引用

var nativePromise = require("./promise.js")



// 关于循环调用的案例
var p = new nativePromise((resolve, reject) => {
    // setTimeout(() => {
        resolve(2000);
    // }, 1000)
    // resolve(1000);
});
// p.then 是同步的
// p.then 中关于对onFulfilled 或者 onRejected 调用以及对结果的处理是异步的

// 
var p2 = p.then(value => { 
        console.log(value);
        console.log(p2 === p2);
        return p2;
})