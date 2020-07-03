console.log("[debugger 1.class.js]");

// ES5

var Animal = (function() {
    "use strict"


    function _instanceOf(left, right) {
        if(right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
            return !!right[Symbol.hasInstance](left);
        }else{
            return left instanceof right;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if(!_instanceOf(instance, Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for(var i = 0; i < props.length; i++ ) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if("value" in descriptor)
                descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor); 
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if(protoProps) _defineProperties(Constructor.prototype, protoProps);
        if(staticProps) _defineProperties(Constructor, staticProps)
        return Constructor;
    }

    
    var Animal = (function() {

        // 构造函数
        function Animal(defaultName) {
            // 检查类型
            _classCallCheck(this, Animal);

            this.defaultName = defaultName;
        }

        _createClass(Animal, [
            {
                key: "print",
                value: function print() {
                    console.log("default print");
                }
            },
            {
                key: "defaultName",
                get: function() {
                    return this._defaultName;
                },
                set: function(defaultName) {
                    this._defaultName = defaultName;
                }
            }
        ], [{
            key:  "load",
            value: function() {
                console.log("start loader");
            }
        }]);
        return Animal;
    })();
    return Animal;

})();

module.exports = Animal