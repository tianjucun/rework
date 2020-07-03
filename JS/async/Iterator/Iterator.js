!function() {
    console.log("[debugger makeInterator]");
    function makeInterator(array) {
        var index = 0;
        return {
            next: function() {
                return index < array.length ? {value: array[index++], done: false} : {done: true};
            }
        };
    }

    var iter = makeInterator([1, 2, 3]);
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
     

    console.log("[debugger nextNumber]");
    // 可以无限获取到一个递增值
    function nextNumber(num) {
        var number = num || 0;
        return {
            next: function() {
                return { value: number++, done: false }
            }
        }
    }

    var createNumber = nextNumber(100);
    console.log(createNumber.next());
    console.log(createNumber.next());
    console.log(createNumber.next());
    console.log(createNumber.next());

    console.log("[debugger objIter]");
    // Iterator 的部署案例
    var obj = {
        name: "zhangsan",
        age: 10,
        sex: "man"
    };

    obj[Symbol.iterator] = function() { // 通过实现 Symbol.iterator 接口的方式部署 Iterator 接口的实现
        let _obj = this,
            keys = Object.keys(obj),
            index = 0;
        return {
            next: function() {
                return index < keys.length ? {value: keys[index++], done: false} : { done: true } 
            }
        }
    }

    let objIter = obj[Symbol.iterator]();
    console.log(objIter.next());
    console.log(objIter.next());
    console.log(objIter.next());
    console.log(objIter.next());

    for(var key of obj) {
        console.log(key + ":", obj[key]);
    }

    // Object.keys 直接遍历

    console.log("[debugger Object.keys]");
    for(var key of Object.keys(obj)) {
        console.log(key + ":", obj[key]);
    }


    // 对于类似数组的对象, 可以通过数组的Iterator接口指向到当前对象， 即可实现 Iterator 接口的部署
    console.log("[debugger typedArray]");
    var typedArray = {
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    };

    console.log(typeof typedArray[Symbol.iterator]); // undefined
    
    // 第一种方式
    // typedArray[Symbol.iterator] = [][Symbol.iterator];

    // 第二种方式
    typedArray =  Array.from(typedArray);

    console.log(typeof typedArray[Symbol.iterator]); // funciton

    for(var v of typedArray) {
        console.log(v);
    }

    // 通过 while 模拟实现 for...of 消费 Iterator 接口
    console.log("debugger iterator by while");
    var array = [1, 2, 3, 'a', 'b'];
    
    var $iter = array[Symbol.iterator]();
    var $res = $iter.next();

    while(!$res.done) {
        var val = $res.value;
        console.log(val);
        $res = $iter.next(); // 调节指针的指向
    }

    // 通过 Generator 来实现 Symbol.iterator 的接口

    console.log("debugger Generator");
    var genIter = {};
    genIter[Symbol.iterator] = function* () {
        yield 1;
        yield 2;
        yield 3;
    }
    console.log([...genIter]);
}();