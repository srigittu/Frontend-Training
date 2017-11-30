/*===========================================================
 GULP : APP TASKS :: Remove and clean build folder
===========================================================*/

'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var config = require( './config' );
 
gulp.task('clean', function () {
	console.log( config.notify.update( '\n----------------------- Clean:Build Folder ---------------------------\n' ) );
    return gulp.src([config.build.root])
        .pipe(clean({force: true}));
});