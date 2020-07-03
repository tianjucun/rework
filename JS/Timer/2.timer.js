// 防抖

    function debounce(fn, wait) {
        var timer = null;
        return function() {
            if(timer!== null) clearTimeout(timer);
            timer = setTimeout(fn, wait);
        }
    } 

// 节流

    // Stamp

    function throttleByTimeStap(fn, delay) {
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

    // Time

    function throttleByTimer(fn, delay) {
        var timer = null;
        return function() {
            var context = this,
                args = arguments;
            if(!timer) {
                timer = setTimeout(() => {
                   fn.apply(context, args);
                   timer = null; 
                }, timeout);
            }
        }
    }

    // All

    function throttle(fn, delay) {

        var timer = null,
            startTime = Date.now();

        return function() {
            var context = this,
                args = arguments;

            var now = Date.now(),
                remainingTime = delay - (now - startTime);
            clearTimeout(timer);
            if(remainingTime <= 0) {
                fn.apply(context, args);
                startTime = Date.now();
            }else{
                timer = setTimeout(() => {
                   fn.apply(context, args);
                   timer = null;     
                }, remainingTime);
            }
        }

    }
