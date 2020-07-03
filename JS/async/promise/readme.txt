英文 Promise A+ 规范参考: https://promisesaplus.com/

中文 Promsie A+ 规范参考：https://segmentfault.com/a/1190000015914967

1. Promise 有三种状态: 

    a. 请求态(pending), 完成态(fulfilled), 拒绝态(rejected)  默认状态为请求态

    b. 只有状态为请求态时才可以向完成态或者拒绝态转换

    c. 一旦请求或拒绝后将不能改变对应的value或者reason

2. Promise 中必须要有then方法

    a. 如果状态为 pending 的话需要将目标执行函数存储下来

    b. then 可以在同一个promise里被多次调用, 所以需要通过类似发布订阅模式来处理 pending 状态下未处理的函数

    c. 在执行上下文堆栈（execution context）仅包含平台代码之前，不得调用 onFulfilled和onRejected, 
    
       所以需要通过 setTimeout 来等函数执行完, 才去调用 onFulfilled和onRejected, 以防止出现循环引用的现象

    c. then 必须返回一个promise, 说明 then 可以链式调用

3. 对于 onFulfilled或者onRejected返回的结果需要进行特殊处理

    a. 判断是否产生循环引用的现象? 
    
        当 onFulfilled或者onRejected 返回值和当前then的返回值相等时就会产生循环引用的现象

        主要原因: 如果不提前拦截, 会导致一直处于pending中, 此操作无意义, 所以需要提前拦截一下

    b. 判断返回值(x)是对象或者方法时, 尝试获取其 then 方法(x.then),
    
         当x.then为函数时(则视为Promise来处理), 否则 resolve(x) 

    c. 只要返回值不是 Promise 则直接 resolve

        function isPromise() {
            return x!==null && (typeof x === "object" || typeof x === "function") && typeof typeof x.then === "function" && x.then;
        }
    
    d. 防止重复调用？为了兼容 与其他版本Promise的合作调用, 
        
        所以需要定义规范标准: 不管对方的Promise如何实现，都只能按照规范来, onFulfilled和onRejected两者只能调用一次
        
        也就是所谓的状态只有为 pending 才可以转为其他状态(fulfilled/rejected)
