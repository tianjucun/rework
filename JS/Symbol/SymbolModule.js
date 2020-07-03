// 手写实现Symbol

var Symbol = (function(){
    var generateName = (function() {
        var postfix = 0;
        return function(descString) { // 闭包
            postfix++;
            return '@@' + descString + "__" + postfix; // 返回一个唯一的字符串标识
        }
    })()

    var SymbolPolyfill = function Symbol(description) {
        console.log("[debug description: ]", description);
        // 实现不可以 new
        if(this instanceof SymbolPolyfill) throw new TypeError("Symbol is not a constructor")

        // 对入参进行处理, 如果是对象则进行自动拆箱处理
        var descString = description === undefined ? undefined : description.toString();

        // 唯一性： 创建一个空对象
        var symbol = Object.create({
            toString: function() { // 为了实现自动拆箱处理+唯一性返回，所以就无法实现隐式转换判断
                return this.__Name__; // 唯一性返回
            },
            valueOf: function() {
                return this; // 返回当前实例
            }
        });    

        // 定义属性描述器
        Object.defineProperties(symbol, {
            '__Description__': {
                value: descString,
                writable: false, // 不可写
                enumerable: false, // 不可枚举
                configurable: false // 不可配置
            },
            '__Name__': {
                value: generateName(descString),
                writable: false, // 不可写
                enumerable: false, // 不可枚举
                configurable: false // 不可配置
            }
        })
        return symbol;
    }

    var forMap = {}; // 定义全局索引表
    Object.defineProperties(SymbolPolyfill, {
        "for": {
            value: function(description) {
                var descString = description === undefined ? undefined : String(description)
                return forMap[descString] ? forMap[descString] : (forMap[descString] = SymbolPolyfill(descString))
            },
            writable: true,
            enumerable: false,
            configurable: true
        },
        'keyFor': {
            value: function(symbol) {
                for(let key in forMap) {
                    if(forMap[key] === symbol) return key;
                }
            },
            writable: true,
            enumerable: false,
            configurable: true
        }
    });

    return SymbolPolyfill;
})();

module.exports = Symbol