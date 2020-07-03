

// 手写实现new

function _new (constructor) {
  var args = [].slice.call(arguments, 1);
  var context = Object.create(constructor.prototype);
  var res = constructor.apply(context, args);
  return res !== null && typeof res === "object" ? res : context;
}


// 手写实现 instanceOf

function _instanceOf (L, R) {
  var O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    if (L === O) return true;
    L = L.__proto__;
  }
}

module.exports = {
  _new,
  _instanceOf
}