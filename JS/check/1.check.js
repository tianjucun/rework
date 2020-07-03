// 判断数组
var isArray = Array.isArray || function (obj) {
  return ({}).toString.call(obj) === ['object Array'];
}

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
// 判断伪数组
var isArrayLike = function (collection) {
  var length = collection.length;
  return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
}
// 判断Arguments
var isArguments = function (obj) {
  return obj != null && obj.hasOwnProperty("callee"); // IE9 以上可以直接用 toString.call(obj) = ['object Arguments']
}

//判断对象是否为空

// 需要考虑的问题：1. 不可枚举的属性; 2. Symbol; 3. 只判断当前对象自身的属性

// for-in 

var isEmptyObjectByForIn = function (obj) {
  if (!!Object.getOwnPropertySymbols(obj).length) return false // length 为有效值
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      return false;
    }
  }
  return true;
}

// Object.keys

var isEmptyObjectByKeys = function (obj) {
  return !Object.getOwnPropertySymbols(obj).length && !Object.keys(obj).length;
}

// JSON.stringify

var isEmptyObjectByStringify = function (obj) {
  return !Object.getOwnPropertySymbols(obj).length && JSON.stringify(obj) === '{}';
}

// getOWnProertyNames 可以获取到不可枚举的属性
var isEmptyObjectByNames = function (obj) {
  return !Object.getOwnPropertySymbols(obj).length && !Object.getOwnPropertyNames(obj).length;
}

// ES6 Reflect
var isEmptyObjectByReflect = function (obj) {
  return !Reflect.ownKeys(obj).length;
}



// 判断所有类型
var checkType = {};
['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'].forEach(function (name) {
  checkType['is' + name] = function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});

//

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