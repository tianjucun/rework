
var globalThis = typeof global === "object" ? global : window;

/**
 * 原理版
 * 不借助 call, apply
 */
Function.prototype._bind_ = function (context, ...args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");

  context || (context = globalThis);

  var
    _this = context,
    fn = this,
    args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }


  function Fbound () {

    for (var i = 0; i < arguments.length; i++) {
      args.push("arguments[" + i + "]");
    }

    // 当返回的函数用于充当构建函数时, 传来的作用域this会丢失
    var boundThis = this instanceof Fbound ? this : _this;

    var key = "caller",
      tempFn;
    if (boundThis.hasOwnProperty(key) && boundThis[key] !== fn) {
      tempFn = boundThis[key];
    }
    boundThis[key] = fn;
    let s = eval("boundThis[key](" + args + ")");
    if (!boundThis[key]) delete boundThis[key]
    else boundThis[key] = tempFn;

    return s;
  };

  var Fn = function () { }
  Fn.prototype = fn.prototype;
  Fbound.prototype = new Fn(); // 会向上查找 Fbound => fn
  return Fbound;
}

/**
 * ES5
 * call apply
 */

Function.prototype._bind_ = function (context, /** ...args */) {
  if (typeof this !== "function") throw new TypeError("this is not a function");

  var fn = this,
    args = [].slice.call(arguments, 1);
  context || (context = globalThis)

  function Fbound (/** ...args */) {
    return fn.apply(this instanceof Fbound ? this : context, args.concat([].slice.call(arguments)));
  }

  // 建立原型链关系
  var Fn = function () { }
  Fn.prototype = fn.prototype;
  Fbound.prototype = new Fn();

  return Fbound;
}

/**
 * 精简版
 * ES6实现
 * 
 */
Function.prototype._bind_ = function (context = globalThis, ...args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");

  var fn = this;

  function Fbound (...boundArgs) {
    return fn.apply(this instanceof Fbound ? this : context, [...args, ...boundArgs]);
  }
  Fbound.prototype = Object.create(fn.prototype);
  return Fbound;
}

module.exports = {}



