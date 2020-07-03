console.log("[debugger 1.object.js]");

// new
function _new(Constructor) {
    // 获取构建所需要参数
    var args = [].slice.call(arguments, 1);

    // 创建一个空对象
    var context = Object.create(Constructor.prototype);

    var result = Constructor.apply(context, args);

    return result!=null && typeof result === "object" ? result : context;
}

// instanceOf

function _instanceOf(L, R) {
    var O = R.prototype;
        L = L.__proto__;
    while(true){
        if(L === null) return false;
        if(L === O) return true;
        L = L.__proto__;
    }
}

module.exports = {
    _new,
    _instanceOf
}