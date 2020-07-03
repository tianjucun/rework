var {Animal, Cat} = require("./rework/1.extends.js");


var cat = Cat.cat1 || new Cat("小花", "白色"); //

// 打印基础对象
console.log("[Cat: ]", cat); // Cat { name: '小花' }
if(typeof cat["printType"] !== "function") {
    console.log("!没有完成对父类原型上的继承!");
}else{
    cat.printType(); // [Animal type]:  猫
}

console.log("[extends field => type: ]", cat.type);
console.log("[extends field => skill: ]", cat.skill);

// 修改引用类型
cat.skill.push("玩毛线球");
console.log("[打印修改后引用类型的信息: ]", cat.skill);

// 证明继承关系
console.log("[cat instanceOf Cat: ]", cat instanceof Cat);
console.log("[cat instanceOf Animal: ]", cat instanceof Animal); // true

var cat2 = Cat.cat2 || new Cat("旺财", "灰色");
// 证明引用类型是否会影响所有实例
console.log("[引用类型是否会影响所有实例: ]", cat2.skill);
