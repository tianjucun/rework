var globalThis = typeof global === "object" ? global : window;

Function.prototype._apply_ = function (context, args = []) {
  if (typeof this !== "function") throw new TypeError("this is not a function");
  let fn = this,
    key = Symbol("caller");

  context || (context = globalThis)
  context[key] = fn;

  let res = context[key](...args);
  delete context[key];
  return res;
}


Function.prototype._applyByES5_ = function (context, args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");

  var fn = this;
  context || (context = globalThis);
  args || (args = []);

  // 判断是否相同的 key 存在, 防止覆盖
  var key = "caller",
    tempFn;
  if (context.hasOwnProperty(key) && context[key] !== fn) {
    tempFn = context[key]
  }
  context[key] = fn;

  // 获取 eval 调用所需参数
  var _args = [];
  for (var i = 0; i < args.length; i++) {
    _args.push("args[" + i + "]");
  }

  // 通过 eval 调用，返回结果
  let s = eval("context[key](" + _args + ")");

  // 重置被覆盖的 key
  if (!tempFn) delete context[key]
  else context[key] = tempFn;

  return s;
}

// 验证this 为null时
console.log(Math.max._apply_(null, [1, 2, 3, 4, 5]));

// 验证this 为有效值时
let arr = [];
arr.push._apply_(arr, [1, 2, 9, 3, 4, 5]);
arr.push._apply_(arr, [1, 2, 9, 3, 4, 5]);
console.log(arr);