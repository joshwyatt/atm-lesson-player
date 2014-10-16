;(function(){
  'use strict';

  // required modules
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')({lazy: false});
  var server = require('./server/server.js');
  var options = require('./gulp_helpers/options.js');

  // tasks
  gulp.task('default', $.sequence('scripts', 'serve'));
  gulp.task('dev', $.sequence('scripts:dev','serve', 'reload'));

  gulp.task('scripts', scripts);
  gulp.task('scripts:dev', scriptsDev);
  gulp.task('serve', serve);
  gulp.task('reload', reload);


  // task functions
  function serve(){
    server();
  }

  function scripts(){
    return gulp.src('./client/www/')
      .pipe($.jshint())
      .pipe($.concat('app.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('./client/dist/'));
  }

  function scriptsDev(){
    return gulp.src('./client/www')
      .pipe($.jshint())
      .pipe(gulp.dest('./client/www'));
  }

  function reload(){
    $.livereload.listen();
    var reloadServer = $.livereload();

    gulp.watch('./client/index.html').on('change', function(file){
      reloadServer.changed(file.path);
    });
    
  }
})();

