const Symbol = require('./rework/3.SymbolModule.js');
// 唯一性

let s1 = Symbol("name");
let s2 = Symbol("name");

console.log("[s1 === s2]", s1 === s2); // false 会返回两个不同的实例

let obj = {
  [s1]: "zhangsan"
};
obj[s2] = "_zhangsan";

console.log(obj[s1], obj[s2]); // 可以作为对象的属性名，保证不会出现同名的属性

// 声明上更加语义化

// let s3 = new Symbol();  // Symbol is not a constructor

let s4 = Symbol("name");
// console.log(s4 + "----"); // Cannot convert a Symbol value to a string

console.log("[symbol instanceOf Symbol]", Symbol() instanceof Symbol); // false


// 构建更人性化
let obj2 = {
  name: "zhangsan"
}
obj2.toString = function () {
  return "zhangsan";
};
let s5 = Symbol(obj2); // 如果为对象则自动进行拆箱处理，调用对象的 toString 方法

console.log(s5); //

// 当Symbol实例作为对象属性时，需要主要的地方

let obj3 = {
  name: "zhangsan",
  [Symbol("age")]: 18
};

// 遍历时，是不会出现在 for in, for of 循环中的 

for (let k in obj3) {
  console.log(k, obj3[k]); // name zhangsan
}

// 使obj变为遍历器

// for(let o of obj) {
//     console.log(o);
// }

// 访问属性时，不可以通过 Object.getOwnPropertyNames/JSON.stringify/Object.keys返回

let obj4 = {
  name: "zhangsan",
  [Symbol("age")]: 18
};

console.log("[Object.getOwnPropertyNames: ]", Object.getOwnPropertyNames(obj4)); // ['name']
console.log("[JSON.stringify: ]", JSON.stringify(obj4)); // {"name":"zhangsan"}
console.log("[Object.keys: ]", Object.keys(obj4)); // ['name']

// 但是，可以通过 Obejct.getOwnPropertySymbols/Reflect.keys返回

console.log("[Object.getOwnPropertySymbols: ]", Object.getOwnPropertySymbols(obj4)); // [Symbol(age)]
console.log("[Reflect.keys: ]", Reflect.ownKeys(obj4)); // [ 'name', Symbol(age) ]


// Symbol.for
let s10 = null;
console.log("[debugger Symbol.for: ]", s10 = Symbol.for("name"));

// Symbol.keyFor
let s10Key = Symbol.keyFor(s10);
console.log("[debugger Symbol.keyFor: ]", s10Key);









