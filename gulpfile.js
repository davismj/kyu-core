var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
	browserify({
		entries: './main.js',
		basedir: './src'
	})
	.transform(babelify.configure({
		modules: 'system',
		moduleIds: false,
		comments: false,
		compact: false,
		stage:2,
		optional: [
			"es7.decorators",
			"es7.classProperties"
		]
	}))
	.bundle()
	.pipe(source('main.js'))
	.pipe(gulp.dest('./dist'));
});