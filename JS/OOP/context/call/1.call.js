
var globalThis = typeof global === "object" ? global : window;

// ES6 实现call

var call = function (context, ...args) {
  var fn = this;
  context || (context = globalThis);
  if (typeof fn !== "function") throw new TypeError("this is not a function");

  var caller = Symbol("caller");
  context[caller] = fn;

  var res = context[caller](...args);
  delete context[caller]
  return res;
}

Function.prototype._callByES6_ = call;


// 通过 ES5 实现call
var callByES5 = function (context) {
  var fn = this;
  if (typeof fn !== "function") throw new TypeError("this is not a function")

  context || (context = globalThis);

  var key = "caller",
    tempFn;
  if (context.hasOwnProperty(key) && context[key] !== this) {
    tempFn = context[key]; // 存储context中原来的函数地址
  }
  context[key] = fn;

  // ES5 的方式获取不定参
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }

  // 通过eval的方法
  let s = eval("context[key](" + args + ")");

  // 重置eval的方法去执行, 返回结果
  if (!tempFn) delete context[key]
  else context[key] = tempFn;

  return s;

}

Function.prototype._callByES5_ = callByES5;


var obj = {
  name: "zhangsan",
  caller: function () {
    console.log("caller");
  },
  say (a, b, c) {
    console.log(a, b, c);
    console.log("name: ", this.name);
  }
}
var say = obj.say;
console.log(say()); // undefined
console.log(say._callByES5_(obj, 1, 2, 3));
obj.caller();


