let express = require('express');
let app = express();

let whiteList = ["http://localhost:8082"];

app.use(function(req, res, next) {
    console.log(req.headers);
    let { origin } = req.headers;
    if(whiteList.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Headers', 'name'); // 'name, name, name...'
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
    }
    next();
});
app.put('/getData', function(req, res) {
    console.log("put");
    res.end("Put!!!");
});
app.get('/getData', function(req, res) {
    console.log("getData");
    res.end("getData!!!");
})
app.use(express.static(__dirname));
app.listen(8083);