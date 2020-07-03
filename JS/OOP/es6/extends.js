class Animal {
	constructor(type) {
  		this.type = type;
  }
  get type() {
  	return this._type;
  }
  set type(type) {
  	this._type = type;
  }
  printType() {
  	console.log("[Animal type]: ", this.type);
  }
  setColor(color) {
  	this.color = color;
  }
}
class Cat extends Animal {
	constructor(name) {
      super("猫");
    this.name = name;
  }
  get name() {
  	return this._name;
  }
  set name(name) {
  	this._name = name;
  }
  setType(type) {
  	super.type = type;
  }
  setColor(color){
  	super.setColor(color)
  }
}


/**
 * 核心方法有三个
 *  
 *      继承: _inherits
 * 
 *      super(): _possibleConstructorReturn
 *      
 *      super.property: _get
 * 
 *      super.property = p: _set, set    
 * 
 */

var Cat =
    /** */
    function () {
        "use strict";

        function _typeof(obj) {
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                _typeof = function _typeof(obj) {
                    return typeof obj;
                };
            } else {
                _typeof = function _typeof(obj) {
                    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
            }
            return _typeof(obj);
        }

        /**
         * 判断：如果 父类构造函数有返回值(等于对象或者function) 则返回对应返回值
         * 
         *       如果没有, 则返回子类的实例
         * 
         * @param {*} self 作用域 =》这里指子类实例
         * @param {*} call 目标函数 =》这里指父类的构造函数
         */
        function _possibleConstructorReturn(self, call) {
            if (call && (_typeof(call) === "object" || typeof call === "function")) {
                return call;
            }
            return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
            if (self === void 0) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self;
        }

        /**
             * 使用环境:
             *      通过 super 关键字获取父类属性时调用.
             *      在子类普通函数(原型函数)中发起调用, target 一般为父类的原型对象,
                    receiver的指向为子类的实例
             *      在子类的静态函数中发起调用, target 一般为 父类, 
                    receiver的指向为子类
             * 
             * 获取目标对象(target)的属性(property)
             * 1. 优先使用 ES6的新API Reflect.get
             * 2. 如果没有则自己创建:
             *      2.1 从当前继承链上查找对应的属性, 
             *          如果没有则返回 undefined; 
             *          如果有则通过调用 getter 方法获取目标对象, 
                        this 绑定为 receiver
             * @param {*} target 
             * @param {*} property 
             * @param {*} receiver 读取函数(getter)的 this 绑定
             */
        function _get(target, property, receiver) {
            if (typeof Reflect !== "undefined" && Reflect.get) {
                _get = Reflect.get;
            } else {
                _get = function _get(target, property, receiver) {
                    var base = _superPropBase(target, property); // 在原型链上进行查找
                    if (!base) return; // 如果没有找到, 则返回 undefined
                    var desc = Object.getOwnPropertyDescriptor(base, property); // 从自身查找
                    if (desc.get) { // 如果实现了get方法则直接返回
                        return desc.get.call(receiver);
                    }
                    return desc.value; // 没有实现get方法直接返回当前属性描述器上对应的值
                };
            }
            return _get(target, property, receiver || target);
        }

        /**
         *  使用环境:
         *      通过 super 关键字更新父类属性时调用
         
         *      在子类普通函数(原型函数)中发起调用,
                target 一般为父类的原型对象, receiver的指向为子类的实例
                
         *      在子类的静态函数中发起调用, target 一般为 父类, 
                receiver的指向为子类
         * 
         * 修改目标对象(target)的属性(property)为给定的值(value)
         * 
         *  1. 优先使用 ES6的新API Reflect.set
         *  2. 如果没有则自己创建:
         *      2.1 从继承链上查找对应属性的描述对象, 调用对应setter函数; 
                    如果没有setter 函数 判断是否开启写入权限
         *      2.2 如果继承链上没有查找到, 则从自身查找, 
                    有的话判断是否开启写入权限, 为开启时直接更新当前描述对象; 
                    没有的话则添加属性到当前对象
         * @param {*} target 
         * @param {*} property 
         * @param {*} value 
         * @param {*} receiver 写入函数(setter)的 this 绑定
         */
        function set(target, property, value, receiver) {
            if (typeof Reflect !== "undefined" && Reflect.set) { // 优先使用 Reflect.set 
                set = Reflect.set;
            } else { // 实现 Reflect.set
                set = function set(target, property, value, receiver) {
                    var base = _superPropBase(target, property);
                    var desc;
                    if (base) { // 从继承链上查找, 判断是否存在此属性, 如果存在
                        desc = Object.getOwnPropertyDescriptor(base, property); // 获取描述对象
                        if (desc.set) { // 对property进行赋值，作用域为receiver
                            desc.set.call(receiver, value);
                            return true;
                        } else if (!desc.writable) { // 不可写
                            return false;
                        }
                    }
                    // 如果继承链上没有此属性, 则从当前类(子类)上查找
                    desc = Object.getOwnPropertyDescriptor(receiver, property); 
                    if (desc) { // 如果找到了
                        if (!desc.writable) { // 判断是否可写
                            return false;
                        }
                        // 在子类上直接修改改属性
                        desc.value = value;
                        Object.defineProperty(receiver, property, desc);
                    } else { // 如果没有此属性, 则进行添加
                        _defineProperty(receiver, property, value);
                    }
                    return true;
                };
            }
            return set(target, property, value, receiver);
        }

        /**
         * 
         * @param {*} target 目标实例 
         * @param {*} property 实例属性
         * @param {*} value 对应的值
         * @param {*} receiver  
         * @param {*} isStrict 是否开启严格模式
         */
        function _set(target, property, value, receiver, isStrict) {
            var s = set(target, property, value, receiver || target);
            // 如果为严格模式&&对不可写的属性进行赋值时直接报错
            if (!s && isStrict) { // 判断是否为严格模式
                throw new Error('failed to set property');
            }
            return value;
        }

        /**
         * 向上遍历原型链判断当前实例是否包含目标属性
         * @param {*} object 当前实例
         * @param {*} property 目标属性
         */
        function _superPropBase(object, property) {
            while (!Object.prototype.hasOwnProperty.call(object, property)) {
                object = _getPrototypeOf(object);
                if (object === null) break;
            }
            return object;
        }

        function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
            };
            return _getPrototypeOf(o);
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function");
            }
            // 组合寄生式继承
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: { value: subClass, writable: true, configurable: true }
            });
            // 实现super, 完善原型链将superClass的原型指向superClass
            if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
            };
            return _setPrototypeOf(o, p);
        }

        function _instanceof(left, right) {
            if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
                return !!right[Symbol.hasInstance](left);
            } else {
                return left instanceof right;
            }
        }

        function _classCallCheck(instance, Constructor) {
            if (!_instanceof(instance, Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }

        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }



        var Animal =
            /*#__PURE__*/
            function () {
                function Animal(type) {
                    _classCallCheck(this, Animal);

                    this.type = type;
                }

                _createClass(Animal, [{
                    key: "printType",
                    value: function printType() {
                        console.log("[Animal type]: ", this.type);
                    }
                }, {
                    key: "setColor",
                    value: function setColor(color) {
                        this.color = color;
                    }
                }, {
                    key: "type",
                    get: function get() {
                        return this._type;
                    },
                    set: function set(type) {
                        this._type = type;
                    }
                }]);

                return Animal;
            }();

        var Cat =
            /*#__PURE__*/
            function (_Animal) {
                _inherits(Cat, _Animal);

                function Cat(name) {
                    var _this;

                    _classCallCheck(this, Cat);
                     
                    // 实现super调用 
                    // 获取super函数 => _getPrototypeOf(Cat)
                    // 如果_getPrototypeOf(Cat).call(this, "猫") !== this 的话, 代表子类作用域被父类的构造函数返回值所修改
                    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cat).call(this, "猫"));
                    _this.name = name;
                    return _this;
                }

                // 获取super关键字 _getPrototypeOf(Cat.prototype)
                _createClass(Cat, [{
                    key: "setType",
                    value: function setType(type) {
                        // _set 方法主要用来校验目标属性是否存在，set操作是否规范
                        _set(_getPrototypeOf(Cat.prototype), "type", type, this, true);
                    }
                }, {
                    key: "setColor",
                    value: function setColor(color) {
                        // _get 方法主要用来交目标属性是否存在，get操作是否规范
                        _get(_getPrototypeOf(Cat.prototype), "setColor", this).call(this, color);
                    }
                }, {
                    key: "name",
                    get: function get() {
                        return this._name;
                    },
                    set: function set(name) {
                        this._name = name;
                    }
                }]);

                return Cat;
            }(Animal);

        return Cat;
    }();


module.exports = Cat