module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: false,
                newcap: false,
                noarg: true,
                sub: true,
                undef: false,
                boss: true,
                eqnull: true,
                unused: false,
                browser: true,
                strict: true,
                jquery: true,
            },
            globals: {
                angular: true,
                moment: true,
                console: true,
                define: true,
                require: true
            },
            all: [
                'app/scripts/*.js',
                'app/scripts/**/*.js',
                '!app/scripts/*.min.js',
                '!app/scripts/**/*.min.js',
            ]
        },

        concat: {
            options: {
                separator: '\n\n'
            },
            app: {
                src: [
                    'app/scripts/production.js',
                    'app/scripts/**/*.js',
                    'app/scripts/webApp.js'
                ],
                dest: 'dist/<%= pkg.name %>-app.js'
            },
            deps: {
                src: [
                    'bower_components/jquery/jquery.min.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/underscore/underscore-min.js',
                    'bower_components/respond/respond.min.js',
                    'bower_components/mustache/mustache.js',
                    'bower_components/cookie/cookie.min.js',
                    'bower_components/momentjs/min/moment.min.js',
                    'bower_components/raf.js/raf.min.js',
                    'bower_components/tweenjs/build/tween.min.js',

                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-touch/angular-touch.min.js',
                    'bower_components/angular-ui/build/angular-ui.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-loading-bar/build/loading-bar.min.js',

                    'js/**/*.js',
                    'js/*.js'
                ],
                dest: 'dist/<%= pkg.name %>-deps.js'
            },
            dist: {
                src: [
                    'dist/<%= pkg.name %>-deps.js',
                    'dist/<%= pkg.name %>-app.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    src: 'dist/<%= pkg.name %>-app.js'
                }]
            }
        },

        asciify: {
            appBanner: {
                text: '<%= pkg.author.split(\' <\')[0] %>',
                options: {
                    font: 'doh', // http://www.figlet.org/examples.html
                    log: false
                }
            }
        },

        bumpup: {
            files: ['package.json', 'bower.json', 'composer.json']
        },

        uglify: {
            options: {
                banner: '/*! \n <%= asciify_appBanner %> \n <%= pkg.name %> <%= grunt.template.today("isoDateTime") %> \n Source: /dist/<%= pkg.name %>.js */ \n',
                preserveComments: 'some',
                mangle: false
            },
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            app: {
                files: [
                    'app/scripts/*.js',
                    'app/scripts/**/*.js',
                    'ngviews/*.html',
                    'application/views/*.php'
                ],
                tasks: [],
                options: {
                    livereload: 35729
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-asciify');
    grunt.loadNpmTasks('grunt-bumpup');

    grunt.registerTask('build', ['jshint', 'concat:deps', 'concat:app', 'ngmin', 'concat:dist', 'asciify', 'bumpup', 'uglify']);

};