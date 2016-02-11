var gulp = require('gulp');
var babel = require('gulp-babel');
var less = require('gulp-less');
var merge = require('merge-stream');
var preprocess = require('gulp-preprocess');

gulp.task('dist', function(){
  return merge(
    gulp.src('src/**/*.js')
        .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}}))
        .pipe(babel({
          stage: 0
        })).pipe(gulp.dest('build')),
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('build')),
    gulp.src('src/**/*.jsx').pipe(babel({
      stage: 0
    })).pipe(gulp.dest('build')),
    gulp.src('src/**/*.less').pipe(less({
      paths: [
       './src'
     ]
    })).pipe(gulp.dest('build')),
    gulp.src('src/images/**/*', {base: 'src'}).pipe(gulp.dest('build'))
  );
});
