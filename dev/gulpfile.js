'use strict';

/*-----------------------------------------------------------
 GULP: DEPENDENCIES
 Define the variables of your dependencies in this section
-----------------------------------------------------------*/
var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp_tasks');

/*==========================================================
 GULP: INIT :: Gulp Default Tasks -- build
===========================================================*/

gulp.task('default', ['build']);