console.log("[debugger: 4.check.js]");

// 检查数组

    var isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
    }

    var isArrayLike = (function() {
        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
        return function(obj) {
            var length = obj.length;
            return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
        }
    })();

    var isArguments = function(obj) {
        return obj!=null && obj.hasOwnProperty("callee");
    }

// 检查空对象

    // 不可枚举, Symbol，只查找当前对象上的属性

    // for-in

    var isEmptyObjectByForIn = function(obj) {
        if(!!Object.getOwnPropertySymbols(obj).length) return false;

        for(var k in obj) {
            if(obj.hasOwnProperty(k)) {
                return false;
            }
        }
        return true;
    }

    // Keys
    var isEmptyObjectByKeys = function(obj) {
        return !Object.getOwnPropertySymbols(obj).length && !Object.keys(obj).length;
    }

    // JSON.stringify
    var isEmptyObjectByStringify = function(obj) {
        return !Object.getOwnPropertySymbols(obj).length && JSON.stringify(obj) === "{}";
    }

    // Names
    var isEmptyObjectByNames = function(obj) {
        return !Object.getOwnPropertySymbols(obj).length && !Object.getOwnPropertyNames(obj).length;
    }

    // ES6 Reflect
    var isEmptyObjectByReflect = function(obj) {
        return !Reflect.ownKeys(obj).length;
    }

 
// 检查所有类型

    var checkType = {};

    ["Arguments", "String", "Number", "Array", "Boolean", "Function", "Date", "RegExp", "Error"].forEach(function(name) {
        checkType["is" + name] = function(obj) {
            return toString.call(obj) === "[object "+ name +"]";
        }
    });

    module.exports = {
        isArray,
        isArrayLike,
        isArguments,
        isEmptyObjectByForIn,
        isEmptyObjectByKeys,
        isEmptyObjectByNames,
        isEmptyObjectByStringify,
        isEmptyObjectByReflect,
        checkType
     };
