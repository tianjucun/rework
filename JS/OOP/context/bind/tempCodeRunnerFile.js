
var globalThis = typeof global === "object" ? global : window;

/**
 * 不借助 call, apply
 */
Function.prototype._bind_ = function(context, ...args) {
    if(typeof this !== "function") throw new TypeError("this is not a function");

    context || (context = globalThis);

    var 
    _this = context,
    fn = this,
    args = [];

    for(var i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");
    }


    function Fbound() {

        for(var i = 0; i < arguments.length;  i++) {
            args.push("arguments[" + i +"]");
        }

        var boundThis = this instanceof Fbound ? this : _this;
        console.log(boundThis);

        var key = Symbol("caller");
        boundThis[key] = fn;
        let s = eval("boundThis[key]("+ args +")");
        delete context[key];
        return s;
    };

    var Fn = function(){}
    Fn.prototype = fn.prototype;
    Fbound.prototype = new Fn();
    return Fbound;
}

/**
 * call apply
 */

Function.prototype._bind_ = function(context, /** ...args */) {
    if(typeof this !== "function") throw new TypeError("this is not a function");

    var fn = this,
        args = [].slice.call(arguments, 1);
    context || (context = globalThis)

    function Fbound(/** ...args */) {
        return fn.apply(this instanceof Fbound ? this : context, [].slice.call(arguments));
    }

    // 建立原型链关系
    var Fn = function() {}
    Fn.prototype = fn.prototype;
    Fbound.prototype = new Fn();

    return Fbound;
}

/**
 * ES6实现
 * 
 */
Function.prototype._bind_ = function(context, ...args) {
    if(typeof this !== "function") throw new TypeError("this is not a function");

    var fn = this;

    // function Fbound(...boundArgs) {
        
    // }
    // Fbound.prototype = Object.create(fn.prototype);
    // return Fbound;

    return function Fbound(...boundArgs) {
        return fn.apply(this instanceof Fbound ? this : context, [...args, ...boundArgs]);
    } && (Fbound.prototype = Object.create(fn.prototype));
}


const m = {
    x: 42,
    getX: function(a, b) {
        console.log(a, b, this.x); // 1, 2
       
        return this.x;
    }
}

let G = m.getX._bind_(m); // 
// // console.log(G(1, 2));
let g = G(1, 2);
console.log(g);
console.log(g instanceof m.getX);
console.log(g instanceof G);
console.log(g === m);
console.log("instance");
let gIntance = new G(1, 2);
console.log(gIntance === m);
console.log(gIntance instanceof m.getX);
console.log(gIntance instanceof G);

// this => chThis 传进来的this

// this => Object.create(G.prototype)

