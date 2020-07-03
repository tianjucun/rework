console.log("[deugger 1.extends.js]");
var Cat = (function() {
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
    
    
    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }
    
    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf : function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return p;
        }
        return _setPrototypeOf(o, p);
    }

    function _instaceOf(left, right) {
        if(right!==null && typeof Symbol === "function" && right[Symbol.hasInstance]) {
            return right[Symbol.hasInstance](left);
        } else {
            return left instanceof right;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if(!_instaceOf(instance, Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperty(obj, key, value) {
        if(key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                writable: true,
                enumerable: true,
                configurable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if("value" in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor);
        }
        return target;
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if(protoProps) _defineProperties(Constructor.prototype, protoProps);
        if(staticProps)  _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _inherits(subClass, superClass) {
        if(typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                enumerable: false,
                configurable: true
            }
        });

        if(superClass) _setPrototypeOf(subClass, superClass);

    }

    function _superPropsBase(object, propery) {
        while(!Object.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if(object === null) break;
        }
        return object;
    }

    function _get(target, property, receiver) {
        if(typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        } else {
            var base = _superPropsBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(target, property);
            if(desc.get) {
                return desc.get.call(receiver, property);
            }
            return desc.value;
        }
        return _get(target, property, receiver);
    }

    function set(target, property, value, receiver) {
        if(typeof Reflect !== "undefined" && Reflect.set){
            set = Reflect.set;
        } else {
            set = function(target, property, value, receiver) {
                var base = _superPropsBase(target, property);
                if(base) {
                    var desc = Object.getOwnPropertyDescriptor(target, property);
                    if(desc.set) {
                        desc.set.call(this, value);
                        return true;
                    } else if(!desc.writable) {
                        return false;
                    }
                }
                var desc = Object.getOwnPropertyDescriptor(receiver, property);
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
        return _set(target, property, value, receiver)
    }

    function _set(target, property, value, receiver, isStrict) {
        var s = set(target, property, value, receiver || target);
        if(!s && isStrict) {
            throw new Error("fail to set property");
        }
        return value;
    }

    var Animal = (function() {
        function Animal(type) {
            _classCallCheck(this, Animal)
            this.type = type;
        }

        _createClass(Animal, [
            {
                key: "printType",
                value: function() {
                    console.log("[Animal Type: ]", this.type);
                }
            },
            {
                key: "setColor",
                value: function(color) {
                    this.color = color;
                }
            },
            {
                key: "type",
                set: function(type) {
                    this._type = type;
                },
                get: function() {
                    return this._type;
                } 
            }
        ])
        return Animal;
    }())

    var Cat = (function(_Animal) {
        _inherits(Cat, _Animal)
        function Cat(name) {
            var _this;
            _classCallCheck(this, Cat);
            _this = _possibleConstructorReturn(this, _getPrototypeOf(Cat).call(this, "猫"));
            _this.name = name;
            return _this;
        }

        _createClass(Cat, [
            {
                key: "setType",
                value: function(type) {
                    _set(_getPrototypeOf(Cat.prototype), "type", type, this, true);
                }
            },
            {
                key: "setColor",
                value: function(color) {
                    _get(_getPrototypeOf(Cat.prototype), "setColor", this).call(this, color);
                }
            },
            {
                key: "name",
                get: function(){
                    return this._name;
                },
                set: function(name) {
                    this._name = name;
                }
            }
        ]);
        return Cat;
    }(Animal));
    return Cat;
})();
module.exports = Cat;