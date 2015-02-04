var gulp = require('gulp');
var minifyHTML = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function(){
  gulp.src('source/*.html')
      .pipe(sourcemaps.init())
      .pipe(minifyHTML())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('build'))
})

gulp.task('default', ['html'])