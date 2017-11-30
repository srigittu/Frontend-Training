/*===========================================================
 GULP: APP TASKS :: Script -- js hint, uglify & concat
===========================================================*/

'use strict';

var gulp = require( 'gulp' );
var uglify = require( 'gulp-uglify' );
var concat = require( 'gulp-concat' );
var config = require( './config' );


//gulp scripts task which compress all application js files
gulp.task( 'script', function() {
	console.log( config.notify.update( '\n-------------------- Running SCRIPT tasks ------------------------\n' ) );
	return gulp.src( config.source.js+'/**/*.js' )
		// .pipe( concat( 'main.js' ) )
		.pipe( gulp.dest( config.build.js ) );
} );

//gulp task which compress all js files
gulp.task( 'uglify-scripts', function() {
	console.log( config.notify.update( '\n---------------- Running minify all scripts tasks -----------------\n' ) );
	return gulp.src(config.build.js+'/*.js')
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(config.build.js));
} );
