var Symbol = (function() {

    // 生成一个唯一的标识串
    var generateName = (function() {
        var postfix = 0;
        return function(descString) {
            postfix++;
            return "@@" + descString + "__" + postfix;
        }
    })();


    var SymbolPolyfill = function Symbol(description) {
        // 不可以new
        if(this instanceof SymbolPolyfill) throw new TypeError("Symbol is not a constructor");

        // 进行自动拆箱
        var descString = description === undefined ? description : String(description);

        // 创建一个空对象, 保证唯一性

        var symbol = Object.create({
            toString: function() {
                return this.__Name__;
            },
            valueOf: function() {
                return this;
            }
        });

        // 定义空对象的相关属相描述
        Object.defineProperties(symbol, {
            "__Description__": {
                value: descString,
                writable: false, // 不可写
                enumerable: false, // 不可遍历
                configurable: false // 不可配置
            },
            "__Name__": {
                value: generateName(descString),
                writable: false, // 不可写
                enumerable: false, // 不可遍历
                configurable: false // 不可配置
            }
        });

        return symbol;
    }


    // 实现两个静态方法
    var forMap = {};
    Object.defineProperties(SymbolPolyfill, {
        "for": { // 根据 key
            value: function(description) {
                var descString = description === undefined ? description : String(description);
                return forMap[descString] ? descString : (forMap[descString] = SymbolPolyfill(descString));
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        "keyFor": {
            value: function(symbol) {
                for (var key in forMap) {
                    if(forMap[key] === symbol) return key;
                }
            },
            writable: true,
            enumerable: false,
            configurable: true 
        }
    });
    return SymbolPolyfill;
})()
module.exports = Symbol;