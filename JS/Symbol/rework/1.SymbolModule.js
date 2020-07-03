console.log("[debugger 1.SymbolModule.js]");

var Symbol = (function(){

    var generateName = (function() {
        var postfix = 0;
        return function(descString) {
            postfix++;
            return "@@" + descString + "__" + postfix;
        }
    }());

    var SymbolPolyfill = function Symbol(descriptor) {
        
        // 不可以new
        if(this instanceof SymbolPolyfill) throw new TypeError("this is not a constructor");

        // 自动拆箱
        var descString = descriptor === undefined ? descriptor : String(descriptor);
    
        // 创建空对象用于接受数据
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
                enumerable: false, // 不可遍历
                writable: false,  // 不可写
                configurable: false  // 不可配置
            }, 
            "__Name__": {
                value: generateName(descString),
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        return symbol;
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
                    if(forMap[key] === symbol) return key
                }
            },
            writable: true,
            enumerable: false,
            configurable: true
        }
    });

    return SymbolPolyfill;
}())

module.exports = Symbol