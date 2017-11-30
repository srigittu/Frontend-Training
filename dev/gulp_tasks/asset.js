'use strict';

var gulp = require( 'gulp' ),
	config = require( './config' );

gulp.task( 'image', function() {
	console.log( config.notify.update( '\n------------------------- Running Images tasks --------------------------\n' ) );
	return gulp.src(config.source.images + '/*.*')
		.pipe(gulp.dest(config.build.images));
});

gulp.task( 'font', function() {
	console.log( config.notify.update( '\n------------------------- Running Fonts tasks --------------------------\n' ) );
	return gulp.src(config.source.fonts + '/*.*')
		.pipe(gulp.dest(config.build.fonts));
});

//gulp scripts task which compress and hint all application js files
gulp.task( 'asset', ['font', 'image'], function() {
	console.log( config.notify.update( '\n------------------------- Running Assests tasks --------------------------\n' ) );
	return gulp.src( 'app/*.html' )
		.pipe(gulp.dest('../build/'));
});