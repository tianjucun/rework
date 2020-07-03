// ES6
var globalThis = typeof global === "object" ? global : window;
var call = function(context, ...args) {
    var fn = this;
    context || (context = globalThis);
    if(typeof fn !== "function") throw new TypeError("this is not a function");

    var caller = Symbol("caller"); // 可以避免context中有相同的属性被覆盖
    context[caller] = fn;

    var res = context[caller](...args);
    delete context[caller];
    return res;
}



var callByES5 = function(context) {
    // 检验参数准确性
    var fn = this;
    context || (context = globalThis);
    if(typeof fn !== "function") throw new TypeError("this is not a function");

    // 检查是否包含目标key, 防止覆盖
    var key = "caller",
        tempFn;
    if(context.hasOwnProperty(key) && context[key] !== this) {
        tempFn = context[key];
    }
    context[key] = fn;

    // ES5 的方式获取不定参
    var args = [];
    for(var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i +']');
    }

    // 通过 eval 的方法去执行, 返回结果
    let s = eval("context[key]("+ args +")");

    // 重置 context[key] 对应的函数
    if(!tempFn) delete context[key] 
    else context[key] = tempFn; 
     
    return s;
}

call

module.exports = callByES5











