console.log("[debugger 3.object.js]");

// _new

function _new(constructor) {
    // 获取构造所需参数
    var args = [].slice.call(arguments, 1);
    // 创建一个空对象，将空对象的原型指针指向 constructor.prototype
    var context = Object.create(constructor.prototype);
    // 将空对象作为目标构造函数的新作用域
    var result = constructor.apply(context, args);
    // 判断结果
    return result!=null && typeof result === "object" ? result : context
}

// _instanceOf

/**
 * 
 * 实现原理：将目标对象实例的原型指针与构造函数的原型实例进行比较，如果不等，则在当前原型链上进行向上查找，直到原型链的尽头
 * 
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