'use strict';

var chalk = require('chalk');

/*-----------------------------------------------------------
 GULP: APP CONFIGURATION
 Source, Build folder and other application configuration
-----------------------------------------------------------*/
var config = function() {

    // Source Path
    var src = {
        root: 'app',
        index: 'app/index.html',
        scss: [
            'app/scss/*.scss'
        ],
        js: 'app/js',
        images: 'app/assets/images',
        fonts: 'app/assets/fonts'
    };

    // Build Path
    var build = {
        root: '../build',
        css: '../build/css',
        js: '../build/js',
        images: '../build/assets/images',
        fonts: '../build/assets/fonts'
    };

    //Default production mode set to false
    var production = false;

    //Bower Configuration
    var bowerConfiguration = {
        paths: {
            bowerDirectory: src.bower,
            bowerrc: '.bowerrc',
            bowerJson: 'bower.json'
        }
    };

    // Chalk config
    var notify = {
        error: chalk.red.bold,
        warning: chalk.black.bold.bgYellow,
        update: chalk.yellow.underline,
        success: chalk.green
    };

    return {
        source: src,
        build: build,
        production: production,
        bowerConfiguration: bowerConfiguration,
        notify: notify,
        serverIP: '127.0.0.1'
    };
};

module.exports = config();