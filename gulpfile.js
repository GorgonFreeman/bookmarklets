const gulp = require('gulp');
var injectPartials = require('gulp-inject-partials');

// Static server
gulp.task('start', function() {
  gulp.watch('src/html/**/*', gulp.parallel(['html']));
});

gulp.task('html', function() {
  return gulp.src('./src/html/index.html')
    .pipe(injectPartials())
    .pipe(gulp.dest('./'));
});