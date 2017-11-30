/*===========================================================
 GULP : APP TASKS :: Start server and live reload
===========================================================*/
'use strict';

var gulp = require( 'gulp' );
var config = require( './config' );
var browserSync = require('browser-sync');

gulp.task('server', function () {
	console.log( config.notify.update( '\n----------------- Server started at -----------------------\n' ) );
    browserSync({
		port: 5000,
		notify: false,
		server: {
		    baseDir: "../build"
		}
    });
});