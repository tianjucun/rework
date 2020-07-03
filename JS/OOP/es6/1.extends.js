console.log("[debugger 1.extends.js]");


// class Animal {
//     constructor(type) {
//         this.type = type;
//     }
//     get type() {
//         return this._type;
//     }
//     set type(type) {
//         this._type = type; 
//     }
//     printType() {
//         console.log("[Animal type: ]", this.type);
//     }
//     setColor(color) {
//         this.color = color
//     }
// }

// class Cat extends Animal {
//     constructor(name) {
//         super("猫");
//         this.name = name;
//     }
//     get name() {
//         return this._name;
//     }
//     set name(name) {
//         this._name = name;
//     }
//     setType(type) {
//         super.type = type;
//     }
//     setColor(color) {
//         super.setColor(color);
//     }

// }


var Cat = (function() {

    function _typeof(obj) {
        // if(typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        //     _typeof = function _typeof(obj) {
        //         return typeof obj;
        //     }
        // } else {
        //     _typeof = function _typeof(obj) {
        //         return obj && Symbol === "function" && obj.constructor 
        //     }
        // }
    }   

    function _possibleConstructorReturn(self, call) {
        if(call && (typeof call == "object" || typeof call === "function")) {
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

    function _instanceof(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
            return right[Symbol.hasInstance](left);
        }else{
            return left instanceof right;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if(!_instanceof(instance, Constructor)) {
            throw new TypeError("Cannot call a class a function");
        }
    }

    function _inherits(subClass, superClass) {
        if(typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        // 组合寄生式继承
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        // 完善原型链
        if(superClass) _setPrototypeOf(subClass, superClass);

    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p){
            o.__proto__ = p;
            return o;
        }
        return _setPrototypeOf(o, p);
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        }
        return _getPrototypeOf(o);
    }

    function _superPropBase(object, property) {
        while (!Object.protptype.hasOwnProperty(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
        }
        return object;
    }

    function _get(target, property, receiver) {
        if(typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        } else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);
                if (!base) return;
                var desc = Object.getOwnPropertyDescriptor(target, property);
                if (desc.get) {
                    return desc.get.call(receiver);
                }
                return desc.value
            }
        }
        return _get(target, property, receiver);
    }

    function set(target, property, value, receiver) {
        if(typeof Reflect !== "undefined" && Reflect.set) {
            set = Reflect.set
        } else {
            set = function set(target, property, value, receiver) {
                var base = _superPropBase(target, property);
                var desc;
                if (base) {
                    desc = Object.getOwnPropertyDescriptor(base, property);
                    if (desc.set) {
                        desc.set.call(receiver,value);
                        return true;
                    } else if(!desc.writable) {
                        return false;
                    }
                    
                }

                desc = Object.getOwnPropertyDescriptor(receiver, property);
                if(desc) {
                    if(!desc.writable) {
                        return false;
                    }
                    desc.value = value;
                    Object.defineProperty(receiver, property, desc);
                } else {
                    _defineProperty(receiver, property, value);
                }
                return true;
            }
        }
        return set(target, property, value, receiver);
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                writable: true,
                configurable: true
            })
        } else {
            obj[key] = value;
        }
        return obj;
    }

    function _set(target, property, value, receiver, isStrict) {
        if(!set(target, property, value, receiver || target) && isStrict){
            throw new Error('failed to set property');
        }
        return value;
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if("value" in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor)
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    var Animal = (function(){
        function Animal(type) { // Animal 构造函数
            _classCallCheck(this, Animal);
            this.type = type;
        }
        _createClass(Animal, [{
            key: "printType",
            value: function printType() {
                console.log("[Animal type]: ", this.type);
            },
            
        },{
            key: "setColor",
            value: function setColor(color) {
                this.color = color
            }

        },{
            key: "type",
            get: function get() {
                return this._type;
            },
            set: function(type) {
                this._type = type;
            }
        }])
        return Animal;
    })();

    var Cat = (function(_Animal) {
        // 实现继承
        _inherits(Cat, _Animal);

        function Cat(name) {
            var _this;
        _classCallCheck(this, Cat);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(Cat).call(this, "猫"));    
        _this.name = name;
        }

        _createClass(Cat, [{
            key: "setType",
            value: function printType(type) {
                _set(_getPrototypeOf(Cat.prototype), "type", type, this, true);
            }
        }, {
            key: "setColor",
            value: function setColor(color) {
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
    })(Animal);    
    return Cat;
})();


module.exports = Cat;