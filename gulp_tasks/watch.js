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
	var HTML = gulp.watch(['app/*.html', 'app/**/*.html'], ['asset']);
	gulp.watch('../build/*.html', reload);
	var SASS = gulp.watch(['app/scss/**/*.scss'], ['style']);
	var log = function( event ) {
		if ( event.type === 'deleted' ) {
			runSequence( 'clean' );
			setTimeout( function() {
				runSequence('style', 'watch');
			}, 500 );
		}
		console.log( config.notify.update( '\n--------- File ' + event.path + ' was ' + event.type + ' ---------\n' ) );
	};
	//on change print file name and event type
	SASS.once( 'update', log );
} );