let {Transform} =  require('stream');

// 他的参数和可写流一样
let tranform1 = Transform({
    transform(chunk,encoding,callback){
        this.push(chunk.toString().toUpperCase()); // 将输入的内容放入到可读流中
        callback();
    }
});
let tranform2 = Transform({
    transform(chunk,encoding,callback){
        console.log(chunk.toString());
        callback();
    }
});
// 等待你的输入
// rs.pipe(ws);
// 希望将输入的内容转化成大写在输出出来
process.stdin.pipe(tranform1).pipe(tranform2);
// 对象流 可读流里只能放buffer或者字符串 对象流里可以放对象