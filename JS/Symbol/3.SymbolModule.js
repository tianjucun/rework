var Symbol = (function() {

    // 生成唯一的标识串
    var genarateName = (function() {
        var postfix = 0;
        return function(descString) {
            postfix ++;
            return "@@" + descString + "__" + postfix;
        }
    })();

    // SymbolPolyfill
    var SymbolPolyfill = function Symbol(description) {
        // 是否new
        if(this instanceof SymbolPolyfill) throw new TypeError("this is not a constructor");

        // 进行自动拆箱
        var descString = description === undefined ? description : String(description);

        // 唯一性: 创建一个空对象
        var symbol = Object.create({
            toString: function() {
                return this.__Name__;
            },
            valueOf: function() {
                return this;
            }
        });

        // 定义属性描述
        Object.defineProperties(symbol, {
            "__Description__": {
                value: descString,
                writable: false, // 不可写
                enumerable: false, // 不可遍历
                configurable: false // 不可以配置
            },
            "__Name__": {
                value: genarateName(descString),
                writable: false, // 不可写
                enumerable: false, // 不可枚举
                configurable: false // 不可配置
            }
        });

        return symbol;
    }

    // 创建两个静态方法
    var forMap = {};
    
    Object.defineProperties(SymbolPolyfill, {
        "for": {
            value: function(description) {
                var descString = description === undefined ? description : String(description);
                return forMap[descString] ? forMap[descString] : (forMap[descString] = SymbolPolyfill(descString));
            },
            writable: true, // 可写
            enumerable: false, // 不可枚举
            configurable: true //可配置 
        },
        "keyFor": {
            value: function(symbol) {
                for (var key in forMap) {
                    if (forMap[key] === symbol) return key;
                }
             },
             writable: true,
             enumerable: false,
             configurable: true // 可配置
        }
    });

    return SymbolPolyfill;
})();
module.exports = Symbol;