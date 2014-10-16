;(function(){
  'use strict';

  var express = require('express');
  var reloadServer = require('connect-livereload');

  module.exports = function(){

    var app = express();
    var port = 8888;

    app.use(reloadServer());
    app.use(express.static(__dirname + '/../client'));

    app.listen(process.env.PORT || port, function(){
      console.log('listening on %d', process.env.PORT || port);
    });

    return app;
  };
})();