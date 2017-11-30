/*===========================================================
 GULP: APP TASKS :: Watch -- all files
===========================================================*/
'use strict';

var gulp = require( 'gulp' ),
	runSequence = require( 'run-sequence' ),
	config = require( './config' ),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task( 'watch', function() {
	console.log( config.notify.update( '\n----------------------- Watching All Files --------------------------\n' ) );
	var HTML = gulp.watch('app/**/*.html', ['asset']);
	gulp.watch('../build/**/*.html', ['inject', reload]);
	var SASS = gulp.watch(['app/scss/**/*.scss'], ['style']);
	var JS = gulp.watch(['app/js/**/*.js'], ['script', reload]);
} );