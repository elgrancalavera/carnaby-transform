'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      grunt: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [ 'gruntfile.js', 'tasks/**/*.js' ]
        }
      },
      test: {
        options: {
          jshintrc: 'test/specs/.jshintrc'
        },
        files: {
          src: [ 'test/specs/**/*.js' ]
        }
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        files: {
          src: [ 'src/**/*.js' ]
        }
      },
    },

    watch: {
      grunt: {
        files: '<%= jshint.grunt.files.src %>',
        tasks: [
          'jshint:grunt',
        ]
      },
      test: {
        options: {
          livereload: true
        },
        files: [
          '<%= jshint.test.files.src %>',
          'test/index.html',
        ],
        tasks: [
          'jshint:test',
          'mocha:dev',
        ]
      },
      src: {
        options: {
          livereload: true
        },
        files: '<%= jshint.src.files.src %>',
        tasks: [
          'jshint:src',
          'mocha:dev',
        ]
      },
    },

    connect: {
      test: {
        options: {
          hostname: 'localhost',
          port: grunt.option('connectPort') || 9000,
          base: '.'
        }
      }
    },

    mocha: {
      options: {
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
            name: 'transform'
          }]
        }
      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
        },
        files: {
          'dist/transform.min.js': [ 'dist/transform.js' ]
        }
      }
    },

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
          start: 'wrap/start.js',
          end: 'wrap/end.js'
        }
      }
    },

    clean: [ 'dist', '.tmp' ]
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
