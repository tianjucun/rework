console.log("[debugger 5.object.js]");

// _new

function _new(constructor) {
    // 获取构造所需参数
    var args = [].slice.call(arguments, 1);
    // 创建一个空对象，将对应的原型指针指向目标构造函数的原型实例 
    var context = Object.create(constructor.prototype);
    // 将 context 作为constructor构造的作用域
    var result = constructor.apply(context, args);
    // 判断结果
    return result!=null && typeof result === "object" ? result : context;
}

// _instanceOf

// 实现原理: 遍历当前对象实例对应的原型链的每一项与构造函数的原型实例进行比较

function _instanceOf(L,R) {
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