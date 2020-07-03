/**
 * 通过 Math.min.apply 调用会有超过 JavaScript 引擎参数长度限制的风险
 * 根据不同的JavaScript的引擎临界值所设置不同, (JavaScript 核心中已经做了硬编码  参数个数限制在65536) 
 * @param {*} arr 
 */
function minOfArray(arr) {
    var min = Infinity; // 定义一个无穷大的值
    var QUANTUM = 32768; 
  
    for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
      var blockSize =  Math.min(i + QUANTUM, len); // 与数组长度去比, 大于数组返回 len
      var sliceArr = arr.slice(i, blockSize); // 执行切块处理
      var submin = Math.min.apply(null, sliceArr); // 获取目前本组最小的值
      min = Math.min(submin, min); // 用本组最小的值与上一组最小的值进行比较
    }
  
    return min; // 获取到最小值
  }
  

  /**
 * 切块的核心在于：最大切多少? 从哪里开始切？ 切到哪
 * 
 * @param {*} arr 
 */  
function getChunk(arr) {
    var chunkSize = 32768,
        len = arr.length;

    var blockGroup = [];
    for(var i = 0; i < len; i+=chunkSize) {
        chunkSize = Math.min(i + chunkSize, len);
        var tempArr = arr.slice(i, chunkSize);
        blockGroup.push(tempArr);
    }
    return blockGroup;
}

//   var min = minOfArray([5, 6, 2, 3, 7]);

function initArr() {
  var len = Math.pow(2, 16) * 2; 
  var arr = [];
  for(var i = 1; i < len; i++) {
    arr.push(i);
  }
  return arr;
}
    var arr = initArr();
  var min = minOfArray(arr);
  console.log(min);
//   console.log(arr[len - 2])
//   console.log(Math.max.apply(null, arr), len);
  console.log(getChunk(arr));