var globalThis = typeof global === "object" ? global : window;

// 通过 ES6 的方式实现apply
var applyByES6 = function (context, args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");
  let fn = this,
    key = Symbol("caller");

  context || (context = globalThis)
  context[key] = fn;

  let res = context[key](...args);
  delete context[key];
  return res;
}

Function.prototype._apply_ = applyByES6;


// 通过 ES5 的方式apply
var applyByES5 = function (context, args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");

  context || (context = globalThis)

  var fn = this,
    tempFn,
    key = "caller";

  if (context.hasOwnProperty(key) && context[key] !== fn) {
    tempFn = context[key];
  }
  context[key] = fn;

  // 获取参数
  var _args = [];
  for (var i = 0; i < args.length; i++) {
    _args.push("args[" + i + "]");
  }

  // eval执行
  let s = eval("context[key](" + _args + ")");

  if (!tempFn) delete context[key]
  else context[key] = tempFn

  return s;
}


Function.prototype._apply_ = applyByES5

let arr = [1, 11];
console.log(Math.max._apply_(null, arr));
console.log(Math.min._apply_(null, arr));
