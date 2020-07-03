手写 bind 核心思想

    1. bind 属于一个典型的闭包函数, 返回一个原函数的拷贝

    2. 参数支持：

        当作用域为null时：

            1. 在非严格模式下, 取全局 globalThis = typeof global === "object" ? global : window;

            2. 在严格模式下, this的值将会是 undefined

        当作用域不为null时：

            1. 当返回的函数用于充当构建函数时, 传来的作用域(this)将会丢失

            2. 

        可变参数

            1. 典型的柯里化函数思想： 可变参数可以分两次进行传入, 第一次为初次调用 bind, 第二次为调用返回的拷贝函数时

            2. 

