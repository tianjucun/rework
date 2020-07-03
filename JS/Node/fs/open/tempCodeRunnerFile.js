var fs = require("fs");
var path = require("path");

fs.open(path.join(__dirname, "../file/a.txt"), "r", 0o666, function(err, fd) {
    if(err) {
        console.log("open file is error: ", err);
        return;
    }
    let buffer = Buffer.alloc(13);
    /**
     * 
     */
    fs.read(fd, buffer, 0, 5, 3, function(err, bytesRead, buffer) {
        if(err) {
            console.log("read file is error: ", err);
            return;
        }
        // bytesRead => 真正读取的字节数
        // buffer => 返回的就是上面定义的buffer(桶)
        console.log(bytesRead,"->", buffer);
    })
});

// function read<TBuffer extends NodeJS.ArrayBufferView>(
//     fd: number, // 文件标识, 用于确定具体的文件
//     buffer: TBuffer, // 数据写入的缓存区, 用于接收读取到的数据
//     offset: number, // 写入时偏移量
//     length: number, // 要读取多少个字节
//     position: number | null, // 指定从文件中读取的位置, 默认为null, 表示为动态更新位置
//     callback: (err: NodeJS.ErrnoException | null, bytesRead: number, buffer: TBuffer) => void,
// ): void;
