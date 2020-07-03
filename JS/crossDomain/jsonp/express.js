let express = require('express');
let app = express();
app.get("/index", function(req, res) {
    let {name, cb} = req.query;
    return res.end(`${cb}('${name}你好, 我叫李四')`);
});
app.listen(8081);