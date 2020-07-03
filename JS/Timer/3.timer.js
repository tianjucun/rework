// 防抖

    function debounce(fn, wait) {
        var timer = null;
        return function() {
            if(timer!=null) clearTimeout(timer);
            timer = setTimeout(() => {
                fn();
            }, wait);
        }
    }

// 节流

    function throttleByStamp(fn, delay) {
        var startTime = Date.now();
        return function() {
            var context = this,
                args = arguments;
            var now = Date.now();

            if(now - startTime > delay) {
                fn.apply(context, args);
                startTime = Date.now();
            }
        }
    }

    function throttleByTimer(fn, delay) {
        var timer = null;
        return function() {
            var context = this,
                args = arguments;
            
            if(!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    timer = null;
                }, delay)
            }
        }
    }

    function throttle(fn, delay) {
        var timer = null,
            startTime = Date.now();
        
        return function() {
            var context = this;
                args = arguments;

            var now = Date.now(),
                remaningTime = delay - (now - startTime);

            clearTimeout(timer);
            if(remaningTime <= 0) {
                fn.apply(context, args);
                startTime = Date.now();
            }else{
                timer = setTimeout(() => {
                    fn.apply(context, args)
                    timer = null;
                }, remaningTime)
            }
        }
    }