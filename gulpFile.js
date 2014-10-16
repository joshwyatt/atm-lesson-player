;(function(){
  'use strict';

  // required modules
  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')({lazy: false});
  var server = require('./server/server.js');
  var options = require('./gulp_helpers/options.js');

  // tasks
  gulp.task('default', $.sequence('scripts:prod', 'serve'));
  gulp.task('dev', $.sequence('scripts:dev', 'inject:dev', 'serve', 'reload'));
  gulp.task('restart_server', $.sequence('scripts:dev', 'inject:dev', 'reload'));

  gulp.task('scripts:prod', scriptsProd);
  gulp.task('scripts:dev', scriptsDev);
  gulp.task('serve', serve);
  gulp.task('inject:dev', injectDev);
  gulp.task('reload', reload);


  // task functions
  function serve(){
    var options = {
      script: 'index.js',
      ext: 'js html',
      nodeArgs: ['--debug']
    };

    $.nodemon(options)
      .on('change', ['restart_server'])
      .on('restart', function(){
        console.log('the server has restarted');
      });

    // server();
  }

  function scriptsProd(){
    return gulp.src('./client/www/')
      .pipe($.jshint())
      .pipe($.concat('app.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('./client/dist/'));
  }

  function scriptsDev(){
    return gulp.src('./client/www/**/*.js')
      .pipe($.jshint());
  }

  function injectDev(){
    var target = gulp.src('./client/index.html');
    var scripts = gulp.src(['./client/www/**/*.js'], {read: false});

    return target
      .pipe($.inject(scripts, {relative: true}))
      .pipe(gulp.dest('./client'));
  }

  function reload(){
    $.livereload.listen();
    var reloadServer = $.livereload();

    gulp.watch('./client/index.html').on('change', function(file){
      reloadServer.changed(file.path);
    });

  }
})();

