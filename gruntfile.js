'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        files: {
            grunt: [
                'gruntfile.js',
                'grunt/**/*.js'
            ],
            specs: [
                'test/specs/**/*.js'
            ],
            specsrunner: [
                'index.html'
            ],
            src: [
                'src/**/*.js',
                '!<%= files.specs %>'
            ],
            meta: [
                'package.json',
                'bower.json'
            ]
        },

        paths: {
            requirejs: {
                base: 'src',
                config: 'src/main.js',
                build: 'build'
            },
            wrap: {
                start: 'wrap/start.js',
                end: 'wrap/end.js',
            },
            dist: 'dist'
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
                    jshintrc: 'test/specs/.jshintrc'
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
            },
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
            test: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= files.specs %>',
                    '<%= files.specsrunner %>',
                ],
                tasks: [
                    'jshint:specs',
                    'mocha:dev',
                ]
            },
            src: {
                options: {
                    livereload: true
                },
                files: '<%= files.src %>',
                tasks: [
                    'jshint:src',
                    'mocha:dev',
                ]
            },
        },

        //----------------------------------
        //
        // connect
        //
        //----------------------------------

        connect: {
            test: {
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
                timeout: grunt.option('timeout') || 5000,
                reporter: 'Spec'
            },
            dev: {
                options: {
                    urls: [
                        'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/test'
                    ]
                }
            },
            dist: {
                options: {
                    urls: [
                        'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/test/?dist=true',
                        'http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/test/?dist=true&min=true'
                    ]
                }
            }
        },

        //----------------------------------
        //
        // requirejs
        //
        //----------------------------------

        requirejs: {
            dist: {
                options: {
                    baseUrl: 'src',
                    dir: '.tmp',
                    optimize: 'none',
                    paths: {
                        underscore: 'empty:',
                        jquery: 'empty:'
                    },
                    modules: [{
                        name: 'transform',
                        include: [
                            'selector',
                            'rule'
                        ]
                    }]
                }
            }
        },

        //----------------------------------
        //
        // uglify
        //
        //----------------------------------

        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                },
                files: {
                    'dist/transform.min.js': ['dist/transform.js']
                }
            }
        },

        //----------------------------------
        //
        // releaser
        //
        //----------------------------------

        releaser: {
            options: {
                additionalFiles: [ 'bower.json' ],
                tagName: 'v<%= version %>',
            },
            bump: {
                options: {
                    bump: true,
                    add: true,
                    commit: true,
                    push: false,
                    tag: false,
                    pushTags: false,
                    npm: false,
                    reloadpkg: true
                }
            },
            release: {
                options: {
                    bump: false,
                    commit: false,
                    add: false,
                    push: true,
                    tag: true,
                    pushTags: true,
                    npm: true,
                }
            }
        },

        bundle: {
            options: {
                src: '.tmp/transform.js',
                dest: 'dist/transform.js',
                wrapper: {
                    start: '<%= paths.wrap.start %>',
                    end: '<%= paths.wrap.end %>'
                }
            }
        },

        //----------------------------------
        //
        // clean
        //
        //----------------------------------

        clean: [
            'dist',
            '.tmp'
        ]
    })

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)
    grunt.loadTasks('tasks')

    grunt.registerTask(
        'default',
        'Build',
        [
            'jshint',
            'clean',
            'requirejs:dist',
            'bundle',
            'uglify:dist',
            'connect:test',
            'mocha:dev',
            'mocha:dist'
        ]
    )

    grunt.registerTask(
        'dev',
        'Lints, starts connect and watches for changes.',
        [
            'jshint',
            'connect:test',
            'watch',
        ]
    )
}
