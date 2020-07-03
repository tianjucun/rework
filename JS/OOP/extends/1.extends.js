console.log("[debugger 1.extends.js]");
var Animal = require("./Animal.js");
/**
 * 实现继承的几种方式
 * 
 *  1. 原型链继承
 * 
 *  2. 借用构造函数继承
 * 
 *  3. 组合式继承
 * 
 *  4. 原型式继承
 * 
 *  5. 寄生式继承
 * 
 *  6. 组合寄生式继承
 */


/**
 * 原型链继承
 * 
 *  1. 任何一个实例对继承过来的引用类型属性操作都将会影响所有实例
 * 
 *  2. 无法在不影响所有对象实例的情况下，向父类的构造函数传递参数
 *  
 */

//  function Cat(name) {
//      this.name = name;
//  }
//  Cat.prototype = new Animal("猫"); // 通过修改原型指向

//  // 通过动态修改 Cat.prototype的方式, 将 constructor 重新指向Cat,
//  // 防止 enumerable 被设置为true
//  Object.defineProperty(Cat.prototype, "constructor", {
//      value: Cat,
//      writable: true,
//      enumerable: false,
//      configurable: true
//  });

 // 不要尝试通过字面量的方式来增加原型对象,因为这钟方式会切断原型链, 切断继承
// Cat.prototype = {
//     printType: function() {

//     }
// }

/**
 * 借用构造函数继承
 * 
 *   跟原型继承相比：
 * 
 *       1. 修改某一个实例的引用类型并不会影响所有实例
 * 
 *       2. 可以在创建某一个对象实例时动态向父类构造函数传参
 * 
 *       3. 无法继承父类原型上的方法
 */

//  function Cat(name, color) {
//      Animal.call(this, "猫", name, color);
//  }

/**
 * 组合式继承
 * 
 *  缺点在于：会调用两次父类的构造函数
 *  
 * 
 */

// function Cat(name, color) {
//     Animal.call(this, "猫", name, color);
// }

// Cat.prototype = new Animal();

// Object.defineProperty(Cat.prototype, "constructor", {
//     value: Cat,
//     writable: true,
//     enumerable: false,
//     configurable:  true
// });

/**
 * 原型式继承
 * 
 *  基于已有的对象创建新的对象, 并没有使用严格意义上的构造函数
 *  因为式基于原型的, 所以操作引用类型仍然是会有问题的
 * 
 */
Object.create = null;
 Object._create = Object.create || function(o) {
     function F() {}
     F.prototype = o;
     return new F();
 }

// function Cat() {}
// Cat.cat1 = Object._create(new Animal("猫", "小花", "白色"));
// Cat.cat2 = Object._create(new Animal("猫", "旺财", "灰色"));

/**
 * 寄生式继承
 * 
 */
//  function createAnimal(animal) {
//      var clone = Object._create(animal);
//      if(animal.type === "猫") {
//         clone.printType = function () {
//             console.log("[寄生式继承 => 增强对象：]", "覆盖 printType 函数");
//         }
//      }
//      return clone;
//  }
//  function Cat() {}

//  Cat.cat1 = createAnimal(new Animal("猫", "小花", "白色"));
//  Cat.cat2 = createAnimal(new Animal("猫", "旺财", "灰色"));

/**
 * 组合式继承
 */

function Cat(name, color) {
    Animal.call(this, "猫", name, color)
}   

inheritPrototype(Cat, Animal);

function inheritPrototype(subType, superType) {

    // 派生父类的原型(clone 父类的原型)
    var prototype = Object._create(superType.prototype); // clone
    // 将子类的原型指针指向 clone过来的父类的原型
    subType.prototype = prototype;
    // 重置 子类原型上 constructor 的指向
    Object.defineProperty(subType.prototype, "constructor", {
        value: subType,
        writable: true,
        enumerable: false,
        configurable: true
    });    

}


module.exports = {
    Animal,
    Cat
}

 