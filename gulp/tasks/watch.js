var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var electron = require('electron-connect').server.create({
  path: './build'
});

gulp.task('watch', ['build'], function(){
  electron.start();
  gulp.watch('src/**/*.*', ['build', 'electron-reload']);
});
