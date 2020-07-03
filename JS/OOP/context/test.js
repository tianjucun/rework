var call = require("./call/call.js");
    
var globalThis = typeof global === "object" ? global : window;
!function () {
    // "use strict";

    globalThis._globalName = "小花猫";
    globalThis._localName = "旺财";
    globalThis._globalColor = "黑色";
    globalThis.color = _globalColor;
    globalThis.catName = _globalName;
    globalThis.num = Math.random();


    var catName = globalThis._globalName;
    var cat = {
        catName: _localName,
        getName: function (color) {
            this.color = color;
            console.log(this);
            console.log(this.catName + ":" + color);
            return {
                color: this.color,
                catName: this.catName
            }
        }
    };

    var cat2 = {
        count: 0,
        fn: function (num) {
            this.count = num;
        }
    }


    !function () {
        if (typeof call === "function") {
            Function.prototype["_call_"] = call;
            console.log("[debugger check call]");
            _FunCallCheckCall();
        }
        if (typeof Function.prototype["_apply_"] === "function") {
            console.log("[debugger check apply]");
            _FunApplyCheckCall();
        }
        if (typeof Function.prototype["_bind_"] === "function") {
            console.log("[debugger check bind]");
            _FunBindCheckCall();
        }
    }()






    /**
     * 测试 call
     * 
     *     1. 是否改变了目标函数的作用域
     *       
     *     2. 调用函数时是否使用传入的新作用域? 是否可以传入不定参? 当新作用域为null的时候是否会取window
     *    
     *     3. 是否会改变目标对象原有属性 context.fn
     *           
     */
    function _FunCallCheckCall() {
        var res;
        res = cat.getName.call(null, "白色");
        // console.log(res);
        // console.log(assertEq([res.color === cat2.color,res.catName === cat2.catName] ,"检测作用域：修改失败!"));
        
        // res = cat.getName._call_(null, globalThis._globalColor);
        // console.log(assertEq([res.color === globalThis._globalColor,res.catName === globalThis._globalName] ,"检测作用域为null时：替换为全局失败!"));
   
    }

    /**
     * 测试 apply 调用
     * 
     *     1. 是否改变了目标函数的作用域
     * 
     *     2. 调用函数时是否使用传入的新作用域? 是否可以传入数组作为参数? 当新作用域为null的时候是否会取window
     * 
     *     3. 是否会改变目标对象原有属性 context.fn
     */
    function _FunApplyCheckCall() {

    }

    /**
     * 检测 bind 调用 
     * 
     *     1. 是否改变了目标函数的作用域
     * 
     *     2. 传入不定参后是否返回了一个新的执行函数, 当新作用域为null的时候是否会取window
     * 
     *     3. 是否会改变目标对象原有属性 context.fn
     * 
     *     4. 当返回函数为构造函数时, context 绑定丢失
     * 
     */
    function _FunBindCheckCall() {

    }

    function assertEq(expresions, msg) {
        expresions = expresions || [];
        console.log(expresions);
        for(var i = 0; i < expresions.length; i++)  {
            if(!expresions[i]) {
                throw new Error(msg);
            }
        }
    }
}()


