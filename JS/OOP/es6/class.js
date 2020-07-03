class Animal {
    // defaultName = "animal" // 实例属性
    constructor(defaultName) {
        this.defaultName = defaultName;
    }
    get defaultName() {
        return this._defaultName;
    }
    set defaultName(defaultName) {
        this._defaultName = defaultName;
    }
    print() {
        console.log("default print");
    }
    static load() {
        console.log("start loader");
    }
}

/**
 *   主要方法：_createClass
 * 
 *        属性添加在实例对象上，方法添加在原型上，静态方法添加在目标函数上
 * 
 */

// ES5
var Animal = (function () {
    "user strict"

    
    function _instanceOf(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
            return !!right[Symbol.hasInstance](left);
        } else {
            return left instanceof right
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!_instanceOf(instance, Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    /**
     * 给当前对象某属性赋值，如果没有则直接创建，如果有则直接修改
     * @param {*} obj 当前实例 
     * @param {*} key 属性名
     * @param {*} value 对应的值
     */
    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            })
        } else {
            obj[key] = value;
        }
        return obj;
    }

    /**
     * 批量为目标实例添加属性描述器， 并重置enumerable，configurable以及writeable属性
     * 
     * @param {*} target 目标实例 
     * @param {*} props 属性描述器组
     */
    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) // 代表可写
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps)
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    var Animal =
        /*#_PURE_*/
        function () {
            // 构造函数
            function Animal(defaultName) {
                _classCallCheck(this, Animal);

                _defineProperty(this, "defaultName", "animal");

                this.defaultName = defaultName;
            }

            _createClass(Animal, [
                {
                    key: "print",
                    value: function print() {
                        console.log("default print");
                    }
                }
                ,
                {
                    key: "defaultName",
                    get: function () {
                        return this._defaultName;
                    },
                    set: function (defaultName) {
                        this._defaultName = defaultName;
                    }
                }], [{
                    key: "load",
                    value: function () {
                        console.log("start loader");
                    }
                }])
            return Animal;
        }();
    return Animal;
})();
module.exports = Animal
