;(function(){
  'use strict';

  // required modules
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')({lazy: false});
  var server = require('./server/server.js');
  var options = require('./gulp_helpers/options.js');

  // tasks
  gulp.task('default', $.sequence('scripts', 'serve'));
  gulp.task('dev', $.sequence('scripts:dev', 'serve'));

  gulp.task('scripts', scripts);
  gulp.task('scripts:dev', scriptsDev);
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
      // .pipe($.livereload());
  }

  function scriptsDev(){
    return gulp.src('./client/www')
      .pipe($.jshint())
      .pipe(gulp.dest('./client/www'))
  }
})();

