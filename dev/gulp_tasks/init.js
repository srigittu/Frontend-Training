/*-----------------------------------------------------------
 GULP : Environment setup
-----------------------------------------------------------*/
'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );
var config = require( './config' );

//Gulp dev environment
gulp.task( 'build', function() {
	console.log( config.notify.update( '\n----------------- Build Development Mode  ---------------------------\n' ) );
	runSequence(
		'clean',
		'server',
		'script',
		'style',
		'asset',
		'inject',
		'watch'
	);
} );

//Gulp prod environment
gulp.task( 'prod', function() {
	console.log( config.notify.update( '\n------------------- Build Production Mode  --------------------------\n' ) );
	config.production = true;
	runSequence(
		/*'clean',
		'download-files',
		'templates',
		'scripts',
		'styles',
		'bundle-libraries',
		'image',
		'fonts',
		'uglify-scripts',
		'minify-css',
		'prod-inject'*/
	);
} );
