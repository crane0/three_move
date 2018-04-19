var express = require('express');
var router = require('./routes/router');

var app = express();
app.use(express.static('public'));

app.use(router);

app.listen(3000,function () {
   console.log('服务器已启动...') 
});