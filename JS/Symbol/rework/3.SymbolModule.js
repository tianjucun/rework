var Symbol = (function () {

  var generateName = (function () {
    var postfix = 0;
    return function (descString) {
      postfix++;
      return "@@" + descString + "__" + postfix;
    } // 闭包
  })(); // 自执行函数

  var SymbolPolyfill = function Symbol (description) {
    // 不可以new
    if (this instanceof SymbolPolyfill) throw new TypeError("Symbol is not a constructor")

    // 进行自动拆箱处理
    var descString = description === undefined ? description : String(description);

    // 创建一个空对象, 保证唯一性
    var symbol = Object.create({
      "toString": function () {
        return this.__Name__;
      },
      "valueOf": function () {
        return this;
      }
    });

    // 自定义属性描述
    Object.defineProperties(symbol, {
      "__Description__": {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      "__Name__": {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      }
    })

    return symbol;
  }

  var forMap = {};
  Object.defineProperties(SymbolPolyfill, {
    "for": {
      value: function (description) {
        var descString = description === undefined ? description : String(description)
        return forMap[descString] ? forMap[descString] : (forMap[descString] = SymbolPolyfill(description))
      },
      enumerable: false,
      writable: true,
      configurable: true
    },
    "keyFor": {
      value: function (symbol) {
        for (var key in forMap) {
          if (forMap.hasOwnProperty(key) && forMap[key] === symbol) {
            return key
          }
        }
      }
    }
  })
  return SymbolPolyfill;
})(); // 自执行函数

module.exports = Symbol;
