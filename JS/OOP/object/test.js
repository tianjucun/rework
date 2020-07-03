const { _new, _instanceOf } = require("./rework/2.object.js");


function Person (name, age) {
  this.name = name;
  this.age = age;
  // return "123"; // 返回一个非对象值 => 得到结果 this
  // return {}; // 返回一个空对象 => 得到结果 {}
  // return null; // 返回null => 得到结果 this
}
var p = _new(Person, "zhangsan", 18);
console.log("[Person example: ]", p, Object.getPrototypeOf(p)); // Person { name: 'zhangsan', age: 18 } Person {}

console.log("[instanceOf Person: ]", _instanceOf(p, Person)); // true

console.log("[instanceOf Object: ]", _instanceOf(p, Object)); // true

console.log("[O instanceOf Person: ]", _instanceOf(new Object(), Person)); // false

console.log("[String instanceOf Funtion: ]", _instanceOf(String, Function)); // true 因为 String 相对Function 也是其派生出的一个对象实例

console.log("[Function instanceOf Object: ]", _instanceOf(Function, Object)); // true 万物皆对象, 所有 Function 其实也是Obejct的一个实例

console.log("[Object instanceOf Function: ]", _instanceOf(Object, Function)); // true 因为JS中函数(Function)是一等公民, Object又是一个函数, 所以Object最终也是指向Function的