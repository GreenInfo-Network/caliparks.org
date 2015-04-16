var gulp           = require('gulp'),
    watch          = require('gulp-watch'),
    rename         = require('gulp-rename'),
    handlebars     = require("gulp-compile-handlebars"),
    jshint         = require('gulp-jshint'),
    uglify         = require('gulp-uglify');

var paths = {
    scss      : './sass/*.scss',
    templates : './views/*.handlebars',
    js        : './public/js/*.js'
};

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jshint({
      "predef" : [
        "define",
        "$",
        "viewData",
        "document",
        "location",
        "google",
        "navigator",
        "window",
        "STMN",
        "history"
      ],
      "expr" : true
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function() {
  gulp.src(paths.js)
  /*
    .pipe(uglify({
      mangle: false,
      output: {
        beautify: true
      }
    }))
    */
    .pipe(gulp.dest('./public/js/dist'))
});

gulp.task('default',function(){
  gulp.start('lint');
  gulp.start('uglify');
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(paths.js, ['lint','uglify']);
    console.log('watching directory:' + paths.js);
});
