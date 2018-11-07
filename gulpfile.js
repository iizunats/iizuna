var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      outFile: 'output.js',
      module:'amd',
      experimentalDecorators:true
    }))
    .pipe(gulp.dest('built/local'));
});