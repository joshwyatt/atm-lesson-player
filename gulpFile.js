;(function(){
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')({lazy: false});
  var server = require('./server/server.js');

  gulp.task('default', $.sequence('serve'));
  gulp.task('serve', serve);

  function serve(){
    server();
  }

})();