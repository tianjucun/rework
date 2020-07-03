var Animal = require("../Animal.js");
/**
 * 6种
 * 
 *      1. 原型链继承
 * 
 *      2. 借用构造函数
 * 
 *      3. 组合继承
 * 
 *      4. 原型式模式
 * 
 *      5. 寄生式继承
 * 
 *      6. 组合寄生式继承
 * 
 * 
 * 
 */

// function Cat(name) {
//     this.name = name;
// }

// Cat.prototype = new Animal("猫");
// Object.defineProperty(Cat.prototype, "constructor", {
//     value: Cat,
//     writable: true,
//     enumerable: false,
//     configurable: true
// });


/**
 * 借用构造函数模式
 */

//  function Cat(name, color) {
//      Animal.call(this, "猫", name, color);
//  }


/**
 * 组合式继承
 */

//  function Cat(name, color) {
//      Animal.call(this, "猫", name, color)
//  }
// Cat.prototype = new Animal();
// Object.defineProperty(Cat.prototype, "constructor", {
//     value: Cat,
//     writable: true,
//     enumerable: false,
//     configurable: true
// });

/**
 * 原型式模式
 * 
 */

//  Object.create = Object.create || _create(o);

//  function _create(o) {
//      function F() {}
//      F.prototype = o;
//      return new F();
//  }


//  function Cat() {}

//  Cat.cat1 = _create(new Animal("猫", "小花", "白色"));
//  Cat.cat2 = _create(new Animal("猫", "旺财", "灰色"));


/**
 * 寄生式模式
 * 
 */

 function createAnimal(animal) {
     var clone = _create(animal);
     if(clone.type === "猫") {
        clone.printType = function() {
            console.log("覆盖 printType 函数");
        }
     }
     return clone;
 }

//  function Cat() {}

//  Cat.cat1 = createAnimal(new Animal("猫", "小花", "白色"));
//  Cat.cat2 = createAnimal(new Animal("猫", "旺财", "灰色"));

/**
 * 
 *  组合寄生式继承
 * 
 */

 function Cat(name, color) {
    Animal.call(this, "猫", name, color);
 }
 _inheritPrototype(Cat, Animal);

 function _inheritPrototype(subClass, superClass) {
    subClass.prototype =  Object.create(superClass.prototype);
    Object.defineProperty(subClass.prototype, "constructor", {
        value: subClass,
        writable: true,
        enumerable: false,
        configurable: true
    })
    if(superClass) subClass.__proto__ = superClass;
 }


module.exports = {
    Animal,
    Cat
};











