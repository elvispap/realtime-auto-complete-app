module.exports = function(grunt) {

    var _ = require("lodash");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                report: 'min',
                mangle: false,
                sourceMap: true
            },
            main: {
                expand: true,
                cwd: 'build/',
                src: [
                    'app.js'
                ],
                dest: 'dist/',
                rename: function(destBase, destPath) {
                    return destBase + destPath.replace('.js', '.min.js');
                }
            },
            lib: {
                expand: true,
                cwd: 'build/',
                src: [
                    'app.lib.js'
                ],
                dest: 'dist/',
                rename: function(destBase, destPath) {
                    return destBase + destPath.replace('.js', '.min.js');
                }
            }
        },
        ngtemplates: { // Move all templates into module: app.templates

            core: {
                cwd: 'src/js/modules',
                src: '**/*.tpl.htm',
                dest: 'build/app.templates.js',
                options: {
                    url: function(url) {
                        return url.replace('.tpl.htm', '.htm');
                    },
                    module: 'app.templates',
                    prefix: '',
                    standalone: true,
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        less: {
              build: {
                files: {
                  'dist/styles/chat-container.css': 'src/styles/chat-container.less'
                }
            }
        },
        cssmin: { // Move all styles into one file: style.min.css
            minify: {
                src: ['src/styles/*.css', 'src/styles/*.less'],
                dest: 'dist/styles/style.min.css'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            lib: {
                src: [
                    'bower_components/lodash/lodash.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    //'bower_components/angular/angular.min.js',
                    'bower_components/restangular/dist/restangular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/angular-strap/dist/angular-strap.js',
                    'bower_components/angular-strap/dist/angular-strap.tpl.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/angular-animate/angular-animate.js',
                    'bower_components/angular-utils-pagination/dirPagination.js',
                    'bower_components/angular-translate/angular-translate.js',
                    'bower_components/moment/moment.js',
                    'bower_components/angular-moment/angular-moment.js',
                    'bower_components/ng-twitter-api/dist/ng-twitter-api.min.js',
                    'bower_components/jsSHA/src/sha1.js'
                ],
                dest: 'build/app.lib.js'
            },
            auth: {
                src: [
                    'src/js/modules/auth/auth.js',
                    'src/js/modules/auth/controllers/LoginController.js',
                    'src/js/modules/auth/controllers/LogoutController.js'
                ],
                dest: 'build/module.auth.js'
            },
            common: {
                src: [
                    'src/js/modules/common/common.js',
                    'src/js/modules/common/api.js',
                    'src/js/modules/common/routing.js',
                    'src/js/modules/common/services/*.js',
                    'src/js/modules/common/directives.js',
                    'src/js/modules/common/filters/*.js',
                    'src/js/modules/common/controllers.js'
                ],
                dest: 'build/module.common.js'
            },
            allModules: {
                src: [
                    'build/module.auth.js',
                    'build/module.common.js'
                ],
                dest: 'build/module.all.js'
            },
            app: {
                src: [
                    'build/module.all.js',
                    'build/app.templates.js',
                    'src/js/application.js'
                ],
                dest: 'build/app.js'
            }
        },
        pack: {
            dev: {},
            prod: {},
            stage: {}
        },
        copy: { // Copy files
            main: {
                files: [{
                    expand: true,
                    src: [
                        'src/index.html'
                    ],
                    dest: 'dist/',
                    filter: 'isFile',
                    flatten: true
                }, {
                    expand: true,
                    src: [
                        'build/app.js',
                        'build/app.lib.js'
                    ],
                    dest: 'dist/',
                    filter: 'isFile',
                    flatten: true
                }, {
                    expand: true,
                    src: [
                        'bower_components/**'
                    ],
                    dest: 'dist/'
                }]
            },
            assets: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/',
                    src: ['**'],
                    dest: 'dist/assets'
                }]
            },
            dev: {}
        },
        jshint: {
            options: {
                browser: true
            },
            all: [
                'Gruntfile.js',
                'src/js/**/*.js'
            ]
        },
        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: [
                    'src/Gruntfile.js',
                    'src/js/modules/**/*.js',
                    'src/js/application.js',
                ],
                tasks: ['pack:dev']
            },
            templates: {
                files: [
                    'src/js/templates/**/*.tpl.htm',
                    'src/**/*.tpl.htm'
                ],
                tasks: ['ngtemplates', 'concat', 'copy', 'uglify:main']
            },
            html: {
                files: [
                    'src/*.html'
                ],
                tasks: ['pack:dev']
            },
            css: {
                files: [
                    'src/*.css',
                    'src/**/*.css'
                ],
                tasks: ['pack:dev']
            },
            less: {
                files: [
                    'src/*.less',
                    'src/**/*.less'
                ],
                tasks: ['less', 'pack:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    // Default task(s).

    // pack the application for development
    grunt.registerMultiTask('pack', "Pack application", function() {
        grunt.task.run(['ngtemplates', 'copy:assets', 'copy:' + this.target, 'concat', 'copy:main', 'uglify:main', 'cssmin']);
    });

    // distribution package
    grunt.registerTask('stage', ['pack:stage', 'uglify:lib']);
    grunt.registerTask('dist', ['pack:prod', 'uglify:lib']);

    // development package
    grunt.registerTask('dev', ['default', 'watch']);

    // default task
    grunt.registerTask('default', ['pack:dev', 'uglify:lib']);
};
