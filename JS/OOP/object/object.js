console.log("[debugger object.js]");
// new
function _new (constructor) {
  // 获取所有参数
  var args = [].slice.call(arguments, 1);
  // 创建一个空对象, 将原型指向目标构造函数的原型实例
  var context = Object.create(constructor.prototype);
  // 将空对象作为新的作用域去初始化 目标构造函数
  var result = constructor.apply(context, args);
  return result != null && typeof result === "object" ? result : context;
}

// instanceOf
/**
 *  判断当前对象实例[[Prototype]]是否指向对应构造函数的原型 
 * 
 *  或 
 * 
 *  对象实例所在原型的原型链中的某一个原型指向对应构造函数的原型
 * 
 * @param {*} L 对象实例 
 * @param {*} R 构造函数
 */
function _instanceOf (L, R) {
  var O = R.prototype, // 获取目标构造函数的原型
    L = L.__proto__; // 获取对象实例的原型
  while (true) {
    if (L === null) return false;
    if (L === O) return true;
    L = L.__proto__ // 向原型链的上层进行查找
  }
}


module.exports = {
  _new,
  _instanceOf
}