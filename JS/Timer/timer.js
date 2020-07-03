// 防抖 debounce

    // 概念：在设定的时间到来之前，只要触发函数就会开始重新计时

    function debounce(fn, wait) {
        var timeout = null;
        return function() {
            if(timeout !== null) clearTimeout(timeout) // 设定时间没有到来之前，清空定时器
            timeout = setTimeout(fn, wait); // 建立新的定时器(只要访问目标函数都会建立一个新的定时器)
        };
    }

// 节流 throttle

    // 概念: 在设定时间到来之前，不管如何访问函数都不会真正触发函数，只有到达设定时间后才会进行触发

    // 通过时间戳
    function throttleByTimeStamp(fn, delay) {
        var prev = Date.now();
        return function() {
            var context = this,
                args = arguments;

            var now = Date.now();
            if(now - prev >= delay) {
                fn.apply(context, args)
                prev = Date.now();
            }
        };
    }

    // 通过定时器
    function throttleByTimer(fn, delay) {
        var timer = null; // 定义定时器
        return function() {
            var context = this;
            var args = arguments;
            if (!timer) { // 没有正在执行的任务,立马开启一个定时器
                timer = setTimeout(() => {
                    fn.apply(context, args); // 到时间后执行目标函数
                    timer = null;
                }, delay);
            }
        }
    }

    // 通过定时器 + 时间戳
    function throttle(fn, delay) {
      var timer = null;
      var startTime = Date.now(); // 获取开始时间
      return function() {
          var context = this,
            args = arguments;
          var now = Date.now();
          var remaining = delay - (now - startTime);
          clearTimeout(timer);
          if(remaining <= 0) {
            fn.apply(context, args);
            startTime = Date.now(); // 重新开始定时
          }else{
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, remaining)
          }
      }  
    } 

    // module.exports = {
    //     debounce,
    //     throttle,
    //     throttleByTimer,
    //     throttleByTimeStamp
    // };

    