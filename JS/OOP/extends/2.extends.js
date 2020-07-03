console.log("[debugger 2.extends.js]");
var Animal = require("./Animal.js");
/**
 * 6种
 * 
 *  1. 原型链继承
 * 
 *  2. 借用构造函数
 * 
 *  3. 组合式继承
 * 
 *  4. 原型式模式
 * 
 *  5. 寄生式继承
 * 
 *  6. 组合寄生式继承
 * 
 */

 /**
  * 
  * 原型链继承
  * 
  *     1. 任何一个实例修改从父类继承过来的应用类型都会影响所有的实例
  * 
  *     2. 无法再不修改任何实例的情况下想父类构造函数传参
  *  
  */

//   function Cat(name) {
//     this.name = name;
//   }

//   Cat.prototype = new Animal("猫");

//   Object.defineProperty(Cat.prototype, "constructor", {
//       value: Cat,
//       writable: true,
//       enumerable: false,
//       configurable: true
//   });

  // 注意：不要用字面量的方式为原型添加方法或属性，因为这样将会切断原型链，阻止继承


/**
 * 
 * 借用构造函数
 */


//  function Cat(name, color) {
//     Animal.call(this, "猫", name, color);
// }


/**
 * 
 * 组合式继承
 */

//  function Cat(name, color) {
//      Animal.call(this, "猫", name, color);
//  }
//     Cat.prototype = new Animal();
// Object.defineProperty(Cat.prototype, "constructor", {
//     value: Cat,
//     writable: true,
//     enumerable: false,
//     configurable: true
// });


/**
 * 
 * 原型式模式
 * 
 * 基于对象的一种clone手段，并没有用到严格意义上的构造函数
 * 
 */
 
 Object.create = Object.create || _create();

 function _create(o) {
    function F() {}
    F.prototype = o;    
    return new F();
 }

//  function Cat() {}
//  Cat.cat1 = _create(new Animal("猫", "小花", "白色"));

//  Cat.cat2 = _create(new Animal("猫", "旺财", "灰色"))


 /**
  * 寄生式继承
  * 
//   */
// function createAnimal(animal) {
//     var clone  = _create(animal);
//     if("猫" === animal.type) {
//         clone.printType = function() {
//             console.log("重新printType");
//         }
//     }
//     return clone;
// }
// function Cat() {}
// Cat.cat1 = createAnimal(new Animal("猫", "小花", "白色"));

// Cat.cat2 = createAnimal(new Animal("猫", "旺财", "灰色"));

/**
 * 组合寄生式继承
 * 
 */

function Cat(name, color) {
    Animal.call(this, "猫", name, color)
}

inheritPrototype(Cat, Animal);    

function inheritPrototype(subType, superType) {
    var prototype = _create(superType.prototype); // clone
    subType.prototype = prototype;
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
