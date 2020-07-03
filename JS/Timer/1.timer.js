// 防抖

function debounce(fn, wait) {
    var timer = null;
    return function() {
        if(timer!=null) clearTimeout(timer);
        timer = setTimeout(fn, wait)
    }
}


// 节流

    // timeStap

function throttleByTimeStamp(fn, delay) {
    var prev = Date.now();
    return function() {
        var context = this,
            args = arguments;

        var now = Date.now();
        
        if(now - prev >= delay) {
           fn.apply(context, args);
           prev = Date.now();     
        }
    }
}

    // Timer

function  throttleByTimer(fn, delay) {
    var timer = null;
    return function() {
        var context = this;
            args = arguments;
        if(timer === null) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null
            }, delay)    
        }
    }
}

// Stap And Timer

function throttle(fn, delay) {
    var timer = null,
        startTime = Date.now();

    return function() {
        var context = this,
            args = arguments;
    
         var now = Date.now();   
        var remainingTime = delay - (now - startTime);
        clearTimeout(timer); // 每次进来都要清空一下定时器
        if(remainingTime <= 0) {
            fn.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, remainingTime);
        }
    }
}