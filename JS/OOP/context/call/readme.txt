手写 call 的核心点

    1. 调用函数时是否使用传入的新作用域? 传入新作用域

        a. 主要思想就是 this 的默认绑定 

        b. 在传进来新的作用域(context)上建立一个新的属性来存储目标函数

        c. 注：一定要保证这个属性不会覆盖原对象的属性

            c.1 ES6 可以通过使用 Symbol 保证属性唯一性

            c.2 ES5 可以通过检查目标对象是否有此属性, 并且保证里面存储的函数与当前要调用的函数不是同一函数，
                   
                    可以把它先存起来，等操作完以后，对原来的函数进行恢复

    2. 是否可以传入不定参 

        a. [...arr]

        b. 可以通过 eval的方法, 将arguments拼接起来传进去

    3. 当新作用域为null的时候是否会取 (window || null)

        1. 在非严格模式下, 取全局 globalThis = typeof global === "object" ? global : window;

        2. 在严格模式下, this的值将会是 undefined


    关于 call 的应用

        1. 借用函数实现类似: 
        
            [].slice.call(arguments, 1) 

        2. 借用构造函数模式实现非原型继承：

            SuperClass.call(subInstance, arg1, arg2, arg3);

        3. 实现调用匿名函数

            (function(i){}).call(_this, index);

        4. ...

        