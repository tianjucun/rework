手写 apply 核心思想

    除传参外, 与 call 完全一致.

    与 call 的区别:

        call提供接收可变参数 [].slice.call(arguments, 1, 2)

        apply提供接收数组参数 [].slice.call(arguments, [1, 2]);

    对于参数需要注意的点：

        1. 支持普通数组

        2. 从 ES5 开始支持类数组对象


应用:

    主要应用在支持可变参数的函数通过调用apply可以变相支持数组

        Math.max.apply

        Math.min.apply

        arr.push.apply(arr, []);

