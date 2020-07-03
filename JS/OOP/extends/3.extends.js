console.log("[debugger 3.extends.js]");
var Animal = require("./Animal.js");
/**
 * 6
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
 * 
 */



 /**
  * 原型链继承
  * 
  *     1. 任何一个对象实例的对从父类继承过来的引用类型修改都将会影响所有实例
  * 
  *     2. 无法通过不修改所有实例的情况去想父类构造函数传参
  * 
  */


//   function Cat(name) {
//     this.name = name;
//   }
//   Cat.prototype = new Animal("猫");

//   Object.defineProperty(Object.prototype, "constructor", {
//       value: Cat,
//       writable: true,
//       enumerable: false,
//       configurable: true
//   });

  // 注意不要尝试用字面量的方式编辑原型的属性或方法, 因为这样将会切断原型链, 阻断继承

/**
 * 借用构造函数模式
 * 
 */

//  function Cat(name, color) {
//      Animal.call(this, "猫", name, color)
//  }


/**
 * 
 * 组合式继承
 */

//  function Cat(name, color) {
//      Animal.call(this, "猫", name, color);
//  }

//  Cat.prototype = new Animal();

//  Object.defineProperty(Cat.prototype, "constructor", {
//      value: Cat,
//      writable: true,
//      enumerable: false,
//      configurable: true
//  });


 /**
  * 原型式模式
  * 
  */

  Object.create = Object.create || _create();

  function _create(o) {
      function F() {}
      F.prototype = o;
      return new F();
  }

//   function Cat() {}
//   Cat.cat1 = _create(new Animal("猫", "小花", "白色"));
//   Cat.cat2 = _create(new Animal("猫", "旺财", "灰色"));


  /**
   * 
   * 寄生式继承
   */

//   function createAnimal(animal) {
//       var clone = _create(animal);
//       if("猫" === clone.type) {
//         clone.printType = function() {
//             console.log("重写printType");
//         }
//       }
//       return clone;
//   }

//   function Cat() {}
//   Cat.cat1 = createAnimal(new Animal("猫", "小花", "白色"));

//   Cat.cat2 = createAnimal(new Animal("猫", "旺财", "灰色"));


  /**
   * 
   * 组合寄生式继承
   */

    function Cat(name, color) {
        Animal.call(this, "猫", name, color);
    }

    inheritPrototype(Cat, Animal);

    function inheritPrototype(subType, superType) {
        var prototype = _create(superType.prototype);
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
