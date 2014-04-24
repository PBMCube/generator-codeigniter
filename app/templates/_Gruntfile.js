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
                    'app/scripts/header.js',
                    'app/scripts/templates.js',
                    'app/scripts/**/*.js',
                    'app/scripts/webApp.js'
                ],
                dest: 'dist/<%= pkg.name %>-app.js'
            },
            deps: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/jquery/jquery.js',
                    'bower_components/respond/respond.js',
                    'bower_components/imagesloaded-packaged/imagesloaded.pkgd.js',
                    'bower_components/greensock/src/minified/TweenMax.js',
                    'bower_components/greensock/src/minified/plugins/ScrollToPlugin.js',

                    'bower_components/angular/angular.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-touch/angular-touch.js',
                    'bower_components/angular-ui/build/angular-ui.js',
                    'bower_components/angular-ui-utils/ui-utils.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-loading-bar/build/loading-bar.js',
                    'bower_components/angular-carousel2/angular-carousel2.js',
                    'bower_components/angular-gridify/angular-gridify.js',
                    'bower_components/angular-ui-router-anim-in-out/anim-in-out.js'
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
            css: {
                files: [
                    'styles/css/*.css'
                ],
                options: {
                    livereload: true
                }
            },
            js: {
                files: [
                    'app/scripts/*.js',
                    'app/scripts/**/*.js'
                ],
                options: {
                    livereload: true
                }
            },
            html: {
                files: [
                    'templates/*.html'
                ],
                options: {
                    livereload: true
                }
            },
            scss: {
                files: [
                    'styles/scss/*.scss'
                ],
                tasks: ['sass']
            }
        },

        sass: {
            dist: {
                options: {
                    sourceComments: 'map',
                    outputStyle: 'compressed',
                    includePaths: require('node-bourbon').includePaths
                },
                files: [{
                    expand: true,
                    cwd: 'styles/scss',
                    src: ['*.scss'],
                    dest: 'styles/css',
                    ext: '.css'
                }]
            }
        },

        ngtemplates: {
            'webApp.templates': {
                src: 'templates/**.html',
                dest: 'app/scripts/templates.js',
                options: {
                    standalone: true,
                    htmlmin: {
                        collapseWhitespace: true
                    }
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-asciify');
    grunt.loadNpmTasks('grunt-bumpup');

    grunt.registerTask('build', ['ngtemplates', 'jshint', 'concat:deps', 'concat:app', 'ngmin', 'concat:dist', 'asciify', 'bumpup', 'uglify', 'sass']);

};
