// TEMPLATE GULPFILE

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var babel = require('gulp-babel');
var minifyJS = require('gulp-uglify');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
  gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('minifyJS', function () {
  gulp.src('./assets/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(minifyJS())
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: "./"
  });
});

gulp.task('gulpwatch', ['sass', 'minifyJS', 'browser-sync'], function () {
  gulp.watch('./assets/scss/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch('./assets/js/*.js', ['minifyJS']).on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['gulpwatch']);