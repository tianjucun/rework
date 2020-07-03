let {Duplex} =  require('stream');
// 双工流 又能读 又能写，而且读取可以没关系(互不干扰);
let d = Duplex({
    read(){
        this.push('FS');
        this.push(null)
    },
    write(chunk,encoding,callback){
        console.log("写进去的内容: ",chunk.toString("utf8"));
        callback();
    }
});
d.on('data',function(data){
    console.log("读到的内容: ", data.toString());
});
d.write('Stream');