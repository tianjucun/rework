console.log("[debugger 1.check.js]");

// 检查对象

    var isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
    }

    var isArrayLike = (function() {
        var MAX_LEN = Math.pow(2, 53) - 1;
        return function(obj) {
            let length = obj.length;
            return typeof length !== "undefined" && length >= 0 && length <= MAX_LEN; 
        };
    })();

    var isArguments = function(obj) {
        return obj!=null && obj.hasOwnProperty("callee");
    }

// 检查空对象

    // 1. 对于不可枚举的属性， 2. 只检查当前对象上的属性, 3. Symbol

    // for in

    var isEmptyObjectByForIn = function(obj) {
        if(!!Object.getOwnPropertySymbols(obj).length) return false

        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    } 

    // Object.keys

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

    // Reflect
    var isEmptyObjectByReflect = function(obj) {
        return !Reflect.ownKeys(obj);
    }


// 检查所有类型

    var checkType = {};

    ["Arguments", "Array", "Object", "Date", "Function", "Number", "String", "RegExp", "Boolean", "Error"].forEach(function(name) {
        checkType["is" + name] = function(obj) {
            return toString.call(obj) === "[object " + name + "]"; 
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


 



