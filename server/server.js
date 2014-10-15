var express = require('express');

var app = express();
var port = 8888;

app.use(express.static(__dirname + '/client'))

app.listen(process.env.PORT || port, function(){
  console.log('listening on %d', process.env.PORT || port);
});