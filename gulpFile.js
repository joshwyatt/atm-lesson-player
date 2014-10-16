;(function(){
  'use strict';

  // required modules
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')({lazy: false});
  var server = require('./server/server.js');
  var paths = require('./gulp_helpers/paths.js');
  var options = require('./gulp_helpers/options.js');

  // tasks
  gulp.task('default', $.sequence('serve'));

  gulp.task('scripts', scripts);
  gulp.task('serve', serve);

  // task functions
  function serve(){
    server();
  }

  function scripts(){
    return gulp.src('./client/www/')
      .pipe($.jshint())
      .pipe($.concat('app.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('./client/dist/'))
      .pipe($.livereload());
  }
})();

