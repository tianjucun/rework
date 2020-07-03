const CheckUtils = require('./rework/1.check.js');

// 检查数组
console.log("Check Array");
let arr = [];
let objLikeArr = {
    name: "zhangsan",
    length: 1
};
let objLikeArguments = {
    0: 'A',
    1: 'B',
    callee: () => {}
};

console.log("[isArray: ]", CheckUtils.isArray(arr));
console.log("[isArrayLike: ]", CheckUtils.isArrayLike(objLikeArr));
console.log("[isArguments: ]", CheckUtils.isArguments(objLikeArguments));

// 检查对象是否为空
console.log("Check Object Is Empty");

var obj = {};
Object.defineProperty(obj, "auth", {
    value: "private",
    writable: true,
    enumerable: false,
    configurable: true
});
console.log("[isEmptyObjectByForIn: ]", CheckUtils.isEmptyObjectByForIn(obj));
console.log("[isEmptyObjectByKeys: ]", CheckUtils.isEmptyObjectByKeys(obj));
console.log("[isEmptyObjectByStringify: ]", CheckUtils.isEmptyObjectByStringify(obj));
console.log("[isEmptyObjectByNames: ]", CheckUtils.isEmptyObjectByNames(obj)); // false
console.log("[isEmptyObjectByReflect: ]", CheckUtils.isEmptyObjectByReflect(obj)); // false

// 检查所有类型
console.log("Check Type");
const CheckType = CheckUtils.checkType;
console.log("[isDate]: ", CheckType.isDate(new Date()));