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
    
})();
module.exports = Cat;