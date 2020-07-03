let express = require('express');
let app = express();

let whiteList = ["http://localhost:8082"];

app.use(function(req, res, next) {
    console.log(req.headers);
    let { origin } = req.headers;
    if(whiteList.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Headers', 'name'); // 'name, name, name...'
        // default: HEAD、GET、POST
        // 在进行非简单请求时, 浏览器会自动发出一个预检请求 OPTIONS
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        res.setHeader('Access-Control-MAX-Age', 3); // 以秒为单位, 指定本次预见请求的有效期
        // 允许头中携带 cookie 信息
        res.setHeader('Access-Control-Allow-Credentials', true);
        // 告诉浏览器 返回头中携带的具体字段 是安全可访问的
        res.setHeader('Access-Control-Expose-Headers', 'name') // 'name, name, name...'
        if(req.method === "OPTIONS") { // 如果为方法OPTIONS的话，不作处理
            res.end();
        }
    }
    next();
});
app.put('/getData', function(req, res) {
    console.log("put");
    // 往返回的头信息后添加一个新的字段
    res.setHeader("name", "tjc");
    res.end("Put!!!");
});
app.get('/getData', function(req, res) {
    console.log("getData");
    res.end("getData!!!");
})
app.use(express.static(__dirname));
app.listen(8083);