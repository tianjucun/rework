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

    function _instanceOf(left, right) {
        if(right !== null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
            return right[Symbol.hasInstance](left);
        } else {
            return left instanceof right;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if(!_instanceOf(instance, Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                writable: true,
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
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, statisProps) {
        if (protoProps) _defineProperties(Constructor, protoProps);
        if (statisProps) _defineProperties(Constructor.prototype, statisProps);
        return Constructor;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Cannot call a class as a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if(superClass) _setPrototypeOf(subClass, superClass);
    }

    function _superPropBase(object, property) {
        while(!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
        }
    }

    function _get(target, property, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
        } else {
            _get = function _get(target, property, receiver) {
                var base = _superPropBase(target, property);
                if(base) {
                    var desc = Object.getOwnPropertyDescriptor(target, property);
                    if (desc.get) {
                        return desc.get.call(receiver);
                    }
                    return desc.value;
                }
                // 找不到则不去receiver上找了
            }
        }
    }

    function set(target, property, value, receiver) {
        if (typeof Reflect !== "undefined" && Reflect.set) {
            set = Reflect.set;
        } else {
            var base = _superPropBase(target, property);
            if (base) { 
                var desc = Object.getOwnPropertyDescriptor(target, property);
                if (desc.set) { // 只尝试调set方法
                    desc.set.call(receiver, value);
                    return true;
                } else if (!desc.writable) {
                    return false;
                }
            } 
            var desc = Object.getOwnPropertyDescriptor(receiver, property);
            if (desc) {
                if(!desc.writable) return false;
                desc.value = value;
                Object.defineProperty(receiver, property, desc);
                return true;
            } else {
                _defineProperty(receiver, property, value);
                return true;
            }
        }
    }

    function _set(target, property, value, receiver, isStrict) {
        let s = _set(target, property, value, receiver || target);
        if (!s && isStrict) {
            throw new Error("fail to set property");
        }
        return value;
    }

    var Animal = (function() {
        function Animal(type) {
            _classCallCheck(this, Animal);
            this.type = type;
        }

        _createClass(Animal, [
            {
                key: "printType",
                value: function() {
                    console.log("[Animal type: ]", this.type);
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
                set: function (type) {
                    this._type = type;
                },
                get: function() {
                    return this._type;
                }
            }
        ]);

        return Animal;
    })();


    var Cat = (function(_Animal) {
        _inherits(Cat, Animal);
        function Cat(name) {
            var _this;
            _classCallCheck(this, _Animal);
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
                set: function(name) {
                    this._name = name;
                },
                get: function() {
                    return this._name
                }
            }
        ]);

        return Cat;
    })(Animal);
    return Cat;
})();
module.exports = Cat;