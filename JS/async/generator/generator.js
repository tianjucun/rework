!function() {

    /**
     * 关于 yield 命令的执行: 
     * 
     *      1. next 方法, 每次遇到 yield 函数就会暂停执行, 并返回 yeild 后表达式的值(懒加载)
     *      
     *      2. next 带参数: 会将此参数作为上一个yield表达式的返回值
     * 
     * @param {*} x 
     */
    function* gen(x) {
        var y = 2 * (yield x + 8);
        var z = yield (y / 4);
        return x + y -z;
    }

    var g = gen(5);
    console.log(g.next(10)); // 仅仅用来启动遍历器对象, 第一次调用设置参数无任何意义 // 打印 => 13
    console.log(g.next(8)); // y = 16 // 打印 => 4
    console.log(g.next(1)) // z = 1 // 打印 => 20
    console.log(g.next()) 




    function* fibonacci() {
        let [prev, curr] = [0, 1];
        for (;;) {
          yield curr;
          [prev, curr] = [curr, prev + curr];
        }
      }
      
      for (let n of fibonacci()) {
        if (n > 1000) break;
        console.log(n);
      }


      /**
       * 对于错误的捕捉
       * 
       *    1. 如果第一次就调用 throw 方法, 会导致整个函数运行失败
       * 
       *    2. 如果调用 throw 方法内部有捕获, 则被捕获, 并自动调用一个 next() 方法
       * 
       *    3. 如果调用 throw 方法内部没有捕获, 则会向函数外抛出错误, 并停止执行
       * 
       */
      function* foo() {
        //   try{
            var x = yield 3;
          var y = x.toUpperCase();
          
        // } catch(e) {
            console.log(e); // x.toUpperCase is not a function
        // }
          var z = yield y;
          yield z
      }

      var it = foo();
    //   it.throw(1); // 必须至少调用一次 next 方法后才可以调用 throw 方法, 否则会直接抛出错误
      console.log(it.next()); // 必须调用 next 方法后才可以
      console.log(it.next(1)); // 因为抛出错误后, 会返回undefined
      console.log(it.next(2)); // 返回 2



      function* numbers () {
        yield 1;
        try {
          yield 2;
          yield 3;
        } finally {
          yield 4;
          yield 5;
        }
        yield 6;
      }
      var g = numbers();
      // 如果调用return() 
      console.log(g.next()) // { value: 1, done: false }
      console.log(g.return(100)) // { value: 100, done: true }
      console.log(g.next()) // { value: undefinde, done: true }
      console.log(g.return(7)) // { value: 7, done: true }
      console.log(g.next()) // { value: undefined, done: true }
      console.log(g.next()) // { value: undefined, done: true }


     // 如果再有finally块的try中调return() 会直接进入 finally块中
    // console.log(g.next()) // { value: 1, done: false }
    // console.log(g.next()) // { value: 2, done: false }
    // console.log(g.return(7)) // { value: 4, done: false }
    // console.log(g.next()) // { value: 5, done: false }
    // console.log(g.next()) // {
    


    // next throw return 三者的区别
    // next 用于将yeild表达式替换成一个值
    // throw 用于将yeild表达式替换成一个throw语句
    // return 用于将yeild表达式替换成一个return语句
    


    function* iterTree(tree) {
        if (Array.isArray(tree)) {
          for(let i=0; i < tree.length; i++) {
            yield* iterTree(tree[i]);
          }
        } else {
          yield tree;
        }
      }
      
      const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
      
      for(let x of iterTree(tree)) {
        console.log(x);
      }

      console.log([...iterTree(tree)]); // 使用扩展运算符



    // 变成构造函数的变通方法
    
    function* gen() {
        this.a = 1;
        yield this.b = 2; // 懒加载赋值
        yield this.c = 3; // 懒加载赋值
      }
      
      function F() {
        // return gen.call(gen.prototype); 
        return gen.call(gen.prototype);
      }
      
      var f = new F();
      
      console.log(f.next());  // Object {value: 2, done: false} 
      console.log(f.next());  // Object {value: 3, done: false}
      console.log(f.next());  // Object {value: undefined, done: true}
      
      console.log(f.a) // 1
      console.log(f.b) // 2
      console.log(f.c)  // 3


      // Generator 函数的异步处理

      function* genAsync() {
        var data = yield fetchData();
        var x = yield data + 1;
        return x;
      }
      var gen = genAsync();
      console.log(gen.next()); // undefined
      function fetchData() {
        setTimeout(() => {
          console.log(gen.next(10)); // 11
          console.log(gen.next(5)); // 5
        }, 1000)
      }


      function* gen() {
        var res = yield Promise.resolve("1000");
        console.log(res);
      }
      var g = gen();
      // console.log(g.next());
      g.next().value.then(res => {
        console.log(res);
        g.next(10);
      })


    }();


    