var Cat = require("./rework/1.extends.js");

var cat = new Cat("小花猫");

// 打印基础对象
console.log("-- 基础信息 --");
console.log("[Cat Info]", cat.type, cat.name);

// printType
cat.printType();

console.log("-- 测试super.type调用 --");
// 测试 super调自定义属性
cat.setType("猫类");

// 打印type
cat.printType();

console.log("-- 测试super.setColor调用 --");
// 测试 super 调用自定义方法 更新 color 信息
cat.setColor("白色");

// 打印继承过来的color
console.log("[Cat Color: ]", cat.color);