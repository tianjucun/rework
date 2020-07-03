console.log("debugger 2.SymbolModule.js");

var Symbol = (function() {

    var generateName = (function() {
        var postfix = 0;
        return function(descString) {
            postfix++;
            return "@@" + descString + "__" + postfix;
        }
    })()

    var SymbolPolyfill = function Symbol(description) {

        // 不能new
        if(this instanceof SymbolPolyfill) throw new TypeError("this is not a constructor")

        // 自动拆箱
        var descString = description === undefined ? description : String(description);
    
        // 创建空对象 symbol
        var symbol = Object.create({
            toString: function() {
                return this.__Name__;
            },
            valueOf: function() {
                return this;
            }
        });

        // 创建自定义描述对象
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
        });
        return symbol
    }

    var forMap = {};
    Object.defineProperties(SymbolPolyfill, {
        "for": {
            value: function(description) {
                var descString = description === undefined ? description : String(description);
                return forMap[descString] ? forMap[descString] : (forMap[descString] = SymbolPolyfill(descString))
            },
            writable: true,
            enumerable: false,
            configurable: true
        },
        "keyFor": {
            value: function(symbol) {
                for(var key in forMap) {
                    if(forMap[key] === symbol) return key;
                }
            },
            writable: true,
            configurable: true,
            enumerable: false
        }
    });
    return SymbolPolyfill;
})();

module.exports = Symbol