console.log("[debugger 1.timer.js]");

// 防抖

function debounce(fn, wait) {
    var timer = null;
    return function() {
        if(timer) clearTimeout(timer);
        timer = setTimeout(fn, wait);
    };
} 


// 节流

    function throttleByTimer(fn, delay) {
        var timer = null;
        return function() {
            var context = this,
                args = arguments;
            
            if(timer === null) {
                timer = setTimeout(function() {
                    fn.apply(context, args)
                    timer = null;
                }, delay)
            }
        }   
    }

    function throttleByStamp(fn, delay) {
        var prev = Date.now();
        return function() {
            var context = this,
                args = arguments;
            var now = Date.now();
            if(now - prev > delay) {
                fn.apply(context, args);
                prev = Date.now();
            }
        }
    }

    function throttle(fn, delay) {
        var startTime = Date.now(),
            timer = null;

        return function() {
            var context = this,
                args = arguments;
            
            var renamingTime = delay - (Date.now() - startTime);
            clearTimeout(timer);
            if(renamingTime < 0) {
             fn.apply(context, args); 
             startTime = Date.now();        
            } else {
                timer = setTimeout(function() {
                    fn.apply(context, args);
                    timer = null;
                }, renamingTime);
            }
        }
    }