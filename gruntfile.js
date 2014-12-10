'use strict';

module.exports = function(grunt) {

    //--------------------------------------------------------------------------
    //
    // configuration
    //
    //--------------------------------------------------------------------------

    grunt.initConfig({

        //----------------------------------
        //
        // Setup
        //
        //----------------------------------

        files: {
            grunt: [
                'gruntfile.js'
            ],
            specs: [
                'src/specs/**/*.js'
            ],
            specsrunner: [
                'index.html'
            ],
            src: [
                'src/**/*.js',
                '!<%= files.specs %>'
            ]
        },

        //----------------------------------
        //
        // jshint
        //
        //----------------------------------

        jshint: {
            grunt: {
                options: {
                    jshintrc: '.jshintrc'
                },
                files: {
                    src: '<%= files.grunt %>'
                }
            },
            specs: {
                options: {
                    jshintrc: 'src/specs/.jshintrc'
                },
                files: {
                    src: '<%= files.specs %>'
                }
            },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                files: {
                    src: '<%= files.src %>'
                }
            }
        },

        //----------------------------------
        //
        // watch
        //
        //----------------------------------

        watch: {
            grunt: {
                files: '<%= files.grunt %>',
                tasks: [
                    'jshint:grunt',
                ]
            },
            specs: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= files.specs %>',
                    '<%= files.specsrunner %>',
                ],
                tasks: [
                    'jshint:specs',
                    'mocha:specs'
                ]
            },
            src: {
                files: '<%= files.src %>',
                tasks: [
                    'jshint:src',
                ]
            }
        },

        //----------------------------------
        //
        // connect
        //
        //----------------------------------

        connect: {
            specs: {
                options: {
                    hostname: 'localhost',
                    port: grunt.option('connectPort') || 9000,
                    base: '.'
                }
            }
        },

        //----------------------------------
        //
        // mocha
        //
        //----------------------------------

        mocha: {
            options: {
                // requirejs will call `mocha.run()`
                run: false,
                timeout: grunt.option('timeout') || 5000
            },
            specs: {
                options: {
                    urls: [
                        'http://<%= connect.specs.options.hostname %>:<%= connect.specs.options.port %>/'
                    ],
                    reporter: 'Spec'
                }
            }
        }
    })

    //--------------------------------------------------------------------------
    //
    // task aliases
    //
    //--------------------------------------------------------------------------

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

    grunt.registerTask(
        'default',
        'Runs all tests and builds the project.',
        [
            'jshint',
            'connect:specs',
            'mocha:specs',
        ]
    )

    grunt.registerTask(
        'dev',
        'Runs `grunt` and then watches for changes to run addtional tasks.',
        [
            'jshint',
            'connect',
            'watch',
        ]
    )
}
