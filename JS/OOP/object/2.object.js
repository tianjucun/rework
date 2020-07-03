console.log("[debugger 2.object.js]");

// _new

function _new(constructor) {
    // 获取构造入参
    var args = [].slice.call(arguments, 1);
    // 创建一个空对象, 将空对象的原型指针指向 constructor.prototype
    var context = Object.create(constructor.prototype);
    // 将返回的空对象作为 构建constructor的作用域
    var result = constructor.apply(context, args);
    // 对result进行处理
    return result!=null && typeof result === "object" ? result : context;
}

// _instanceOf
/**
 * 实现原理：将目标对象实例的原型指针与目标构造函数进行比对, 如果不等, 在当前原型链上继续查找, 直到原型链的尽头
 * @param {*} L 
 * @param {*} R 
 */
function _instanceOf(L, R) {
    var O = R.prototype,
        L = L.__proto__;

    while(true) {
        if(L === null) return false;
        if(L === O) return true;
        L = L.__proto__;
    }
}
module.exports = {
    _new,
    _instanceOf
}