/* jshint node: true */
/* jshint strict:false */

let gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	tsify = require('tsify'),
	glob = require('glob');

// Build JS
gulp.task('scripts', function () {
	return browserify({
		basedir: '.',
		debug: false,
		entries: glob.sync('./src/main.ts'),
		cache: {},
		packageCache: {}
	}).plugin(tsify)
	  .bundle()
	  .pipe(source('build.js'))
	  .pipe(gulp.dest('output'));
});


// Default gulp task
gulp.task('default', ['scripts']);