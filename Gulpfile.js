var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    neat           = require('node-neat').includePaths,
    watch          = require('gulp-watch'),
    rename         = require('gulp-rename'),
    handlebars     = require("gulp-compile-handlebars"),
    jshint         = require('gulp-jshint'),
    uglify         = require('gulp-uglifyjs'),
    autopolyfiller = require('gulp-autopolyfiller');

var paths = {
    scss      : './sass/*.scss',
    templates : './views/*.handlebars',
    js        : './js/*.js'
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
    .pipe(jshint()).pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('uglify', function() {
  gulp.src(paths.js)
    .pipe(rename({extname:'.min.js'}));
});

gulp.task('polyfill', function() {
  gulp.src(paths.js)
    .pipe(autopolyfiller('polyfills.js'))
    .pipe(gulp.dest('./public/js'));
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
