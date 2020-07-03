Iterator 的作用

    1. 为各种数据类型提供统一的访问接口

    2. 提供数据源, 供 for... of 消费

Iterator 优点

    1. 有着同 for...in 一样的简洁语法，但是没有 for...in 那些缺点

        for...in 缺点: 遍历包括原型链的数据, 自动把 key 的类型转为String, 
                       对于 key为数字时 自动会以 (0, 1, 2...) 的顺序遍历, 相对原对象来说可能会导致乱序

                       {2: 'a', 1: 'c', '10': 'b'} => print => 1, 2, 10

    2. 不同于 forEach 方法，它可以与 break、continue和return 配合使用


核心处理思想

    1. 通过调用指针对象 next 来指向下一条数据, 并返回 {value: value, done: false}

    2. 当指针对象 next 指向数据结构的结束位置时, 返回 {value: undefinde,done: true}

    3. 其中 value: 代表返回的值; done: 代表当前指针是否指向结束位置


接口部署

    实现 Symbol.iterator 接口 , for...of 循环会自动去消费 obj[Symbol.iterator]() 接口


ES6 原生提供对 Iterator 接口实现的数据结构

    1. Array 2. Map 3. Set 4. String 5. TypedArray 6. 函数的 arguments 对象 7. NodeList 对象 


ES6 中那些场合会默认调用 Iterator 接口

    1. 结构赋值

    2. 扩展运算符

    3. yield *

    4. 数组的遍历调用; eg: for...of, Array.from(), Promise.all, Promise.race, Map ...

关于 遍历器对象 除了需要部署 next 方法, 还可以部署什么方法

    1. return() 主要作用: 用于在一个对象完成遍历前, 实现对 return 钩子函数的调用

    2. throw()




