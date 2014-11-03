var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    neat           = require('node-neat').includePaths,
    watch          = require('gulp-watch'),
    rename         = require('gulp-rename'),
    handlebars     = require("gulp-compile-handlebars"),
    jshint         = require('gulp-jshint'),
    uglify         = require('gulp-uglify'),
    autopolyfiller = require('gulp-autopolyfiller');

var paths = {
    scss      : './sass/*.scss',
    templates : './views/*.handlebars',
    js        : './public/js/*.js'
};

gulp.task('styles', function () {
  return gulp.src(paths.scss)
      .pipe(sass({
          includePaths: ['styles'].concat(neat)
      }))
      .pipe(gulp.dest('./public/style'));
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function() {
  gulp.src(paths.js)
    .pipe(uglify({
      mangle: false,
      output: {
        beautify: true
      }
    }))
    .pipe(gulp.dest('./public/js/dist'))
});

gulp.task('polyfill', function() {
  gulp.src(paths.js)
    .pipe(autopolyfiller('polyfills.js'))
    .pipe(gulp.dest('./public/js/helpers'));
});

gulp.task('default',function(){
  gulp.start('lint');
  gulp.start('polyfill');
  gulp.start('uglify');
  gulp.start('styles');
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['lint','uglify', 'polyfill']);
    console.log('watching directory:' + paths.js);

    gulp.watch(paths.scss, ['styles']);
    console.log('watching directory:' + paths.scss);
});
