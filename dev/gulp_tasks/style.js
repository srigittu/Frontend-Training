/*===========================================================
 GULP : APP TASKS :: CSS & SASS -- minify, concat
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var	concat = require('gulp-concat');
var config = require( './config' );
var browserSync = require('browser-sync');

gulp.task( 'style', function() {
	console.log( config.notify.update( '\n--------------------------- Running SCSS tasks --------------------------\n' ) );
	return gulp.src( config.source.scss )
				.pipe(sass()).on('error', gutil.log)
				.pipe(concat('style.css'))
				.pipe(gulp.dest(config.build.css))
				.pipe(browserSync.stream());
} );

// gulp styles task which compress all css into single css
// gulp.task( 'compile:styles', ['compile:sass'], function() {
// 	console.log( config.notify.update( '\n--------------------------- Running CSS tasks --------------------------\n' ) );
// 	config.source.css.push(config.build.css+'/*.*');
// 	return gulp.src( config.source.css )
// 				.pipe(concat('style.css'))
// 				.pipe(gulp.dest(config.build.css));
// } );

gulp.task( 'minify-css', function() {
	console.log( config.notify.update( '\n---------------------- Running Minify-CSS tasks -------------------------\n' ) );
	return gulp.src( [ config.build.css + '/*.css' ] )
		.pipe( cleanCSS( {
			debug: true
		} ) )
		.pipe( concat( 'style.min.css' ) )
		.pipe( gulp.dest( config.build.css ) );
} );