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
// }).then(x => {}, y => console.log(y)) // 链式调用（p2 = p3） 返回是 p3, 所以这种是不会出现循环调用的
p2.then(x => {}, y => console.log(y)) // 会出现循环调用的情况: 非链式调用 promise.status === rejected
// 调用 then => => 返回一个promise




// 关于不同promise间状态的传递, 总是从上一个Promise中获取状态的绑定, 利用this 的默认绑定原理
var p3 = new Promise(resolve => { // p3:pending =>  p3: fullfilled
    // console.log("p3.value: ", value);
    return resolve(1000);
}).then(value => { // .then: 产生了一个新的返回值 p4; 是调用onFulfilled还是onRejected 取决于上一个状态
    console.log("p4.value: ", value);
    throw value; // p4:pending => p4: rejected 
}).then(value => { // 上一个状态是rejected, 如果没有捕获, 会默认 throw 出去, 然后被捕获, p5: reject
    console.log("p5.value: ", value);
    return value;
}).then().then(value => { // p7

}, reason => {
    console.log("p7.reason:", reason)
}); 

// 输出结果: 
// p4.value:  1000
// p7.reason: 1000

// 


var p8 = new Promise((resolve, reject) => {
    resolve("before");
    console.log("after"); // 会打印
});





