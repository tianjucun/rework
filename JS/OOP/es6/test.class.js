var Animal = require("./1.class.js");

var animal = new Animal("小动物"); // 默认名字小动物

// 打印基本信息
console.log("[Animal Info：]", animal.defaultName);

// 执行默认打印00
animal.print();

// 执行静态加载
Animal.load();


