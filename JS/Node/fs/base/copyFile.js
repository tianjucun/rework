var fs = require("fs");
var path = require("path");



function copyFile(src, target) {
    fs.readFile(src, function(err, data) {
        if(err) {
            console.log("read file error: ", err);
            return;
        }
        fs.writeFile(target, data, "utf8", function(err){
            if(err) {
                console.log("write file error: ", err);
            }
            console.log("copy success");
        });
    })    
}

copyFile(path.join(__dirname, "./file/a.txt"), path.join(__dirname, "./file/b.txt"));