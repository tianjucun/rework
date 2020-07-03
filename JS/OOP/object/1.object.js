console.log("[debugger 1.object.js]");


// new 

function _new(constructor) {
    // 获取入参
    var args = [].slice.call(arguments, 1);
    // 创建一个空对象, 原想指向 constructor.prototype
    var context = Object.create(constructor.prototype);
    // 将空对象作为构造函数 constructor 的作用域
    var result = constructor.apply(context, args);
    // 判断返回数据的类型
    return result!=null && typeof result === "object" ? result : context;
}

// instanceOf

/**
 * 判断当前对象实例[[Prototype]]是否指向对应构造函数的原型
 * 
 * 或
 * 
 * 对象实例所在原型的原型链中的某一个原型指向对应构造函数
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