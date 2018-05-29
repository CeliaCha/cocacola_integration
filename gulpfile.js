// TEMPLATE GULPFILE

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const babel = require('gulp-babel');
const minifyJS = require('gulp-uglify');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync');

gulp.task('sass', function () {
  gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('lint-css', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');
 
  return gulp
    .src('src/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js','!node_modules/**'])
      // eslint() attaches the lint output to the "eslint" property
      // of the file object so it can be used by other modules.
      .pipe(eslint())
      // eslint.format() outputs the lint results to the console.
      // Alternatively use eslint.formatEach() (see Docs).
      .pipe(eslint.format())
      // To have the process exit with an error code (1) on
      // lint error, return the stream and pipe to failAfterError last.
      .pipe(eslint.failAfterError());
});

gulp.task('minifyJS', function () {
  gulp.src('./assets/js/*.js')
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