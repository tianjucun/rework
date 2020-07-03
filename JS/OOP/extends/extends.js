var Animal = require("./Animal.js");
/**
 *  实现继承的几种方式
 * 
 *  1. 原型链继承
 * 
 *  2. 借用构造函数
 * 
 *  3. 组合式继承
 * 
 *  4. 原型式继承
 * 
 *  5. 寄生式继承
 * 
 *  6. 组合寄生式继承
 * 
 */

/**
 * 原型链继承特点
 * 
 *  1. 任何一个实例对继承过来的引用类型属性操作将会影响所有实例
 * 
 *  2. 无法在不影响所有对象实例的情况下, 向父类的构造函数传递参数
 * 
 */

function Cat (name) {
  this.name = name;
}

Cat.prototype = new Animal("猫"); //

// 可以通过动态修改Cat.prototype的方式,将 constructor 重新指向 Cat
Object.defineProperty(Cat.prototype, "constructor", {
  value: Cat,
  writable: true,
  enumerable: false,
  configurable: true
});

// Cat.prototype = { // 不要尝试通过字面量的方式操作目标原型, 因为这将会重新目标对象, 切断继承
//   printType: function () {
//     console.log("");
//   }
// };

// var cat1 = new Cat();
// console.log(cat1.skill);
// cat1.skill.push("玩");
// console.log(cat1.skill);
// console.log(new Cat().skill); // 因为访问的是同一个原型

/**
 * 借用构造函数
 *   
 *    跟原型继承相比：
 *      
 *        1. 修改某一个实例的引用类型并不会直接影响所有的实例
 * 
 *        2. 可以在创建某一个实例时动态向父类构造函数传参
 * 
 *        3. 无法继承父类原型上的方法
 * 
 */

//  function Cat(name, color) {
//     Animal.call(this, "猫", name, color);
//  }

/**
 * 组合继承
 * 
 *  顾名思义就是将 原型链继承与借用构造函数模式 结合起来使用
 * 
 *  进而使上面两种模式进行互补， 扬长避短
 *  
 */
// function Cat (name, color) {
//   Animal.call(this, "猫", name, color);
// }
// Cat.prototype = new Animal();
// Object.defineProperty(Cat, "constructor", {
//   value: Cat,
//   writable: true,
//   enumerable: false,
//   configurable: true
// });


/**
 * 原型式继承
 *   基于已有的对象创建新对象, 并没有使用严格意义上的构造函数
 *   因为是基于原型链的，所以操作引用类型仍然是会有问题的
 */

// 自定原型对象： Object.create
// Object._create = (typeof Object.create === "function" && Object.create) || _create;

// function _create (o) {
//   function F () { } // 创建一个临时函数 
//   F.prototype = o; // 将临时函数的原型指针指向对应的原型实例
//   return new F(); //
// }

// function Cat () { }
// Cat.cat1 = _create(new Animal("猫", "小花", "白色"));
// Cat.cat2 = _create(new Animal("猫", "旺财", "灰色"));


/**
 * 寄生式继承
 * 通过类似工厂模式的方法对具体对象进行增强
 */

// function createAnimal (animal) {
//   var clone = _create(animal);
//   if ("猫" === animal.type) {
//     clone.printType = function () {
//       console.log("[寄生式继承 => 增强对象：]", "覆盖 printType 函数");
//     }
//   }
//   return clone;
// }
// Cat.cat1 = createAnimal(new Animal("猫", "小花", "白色"));
// Cat.cat2 = createAnimal(new Animal("猫", "旺财", "灰色"));

/**
 * 寄生组合式继承
 *  
 *  缺点：无论什么情况下否会调用两次超类型构造函数：一次是在创建子类型原型的时候，另一次是
 *   在子类型构造函数内部。
 * 
 */

// function Cat (name, color) {
//   Animal.call(this, "猫", name, color); // 借用构造函数模式
// }

// inheritPrototype(Cat, Animal);

// function inheritPrototype (subType, superType) {
//   var prototype = _create(superType.prototype); //原型式模式： 创建对象, 原型指向 superType 的原型
//   Object.defineProperty(prototype, "constructor", { // 将返回的新原型(extends superType) 的构造函数指向 子类(subType)
//     value: subType,
//     writable: true,
//     enumerable: false,
//     configurable: true
//   });
//   subType.prototype = prototype; // 原型链模式： 将 subType 的原型指向 新原型(extends superType)，完成对父类原型上的继承
// }


module.exports = {
  Animal,
  Cat
};











