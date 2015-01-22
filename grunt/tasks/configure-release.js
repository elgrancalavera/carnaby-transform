'use strict';

var _ = require('lodash')

module.exports = function(grunt) {


    grunt.registerTask(

    'configureRelease',

    'Configures grunt-release depending on flags passed by the' +
    'command line. If no release related flags are passed' +
    'grunt-release will not be configured and the task will' +
    'not run at all.\n' +

    '--bump:\n' +
    'Just bumps the version without adding anything to git or pushing ' +
    'anything at all.\n' +

    '--publish:\n' +
    'Doesn\'t bump version numbers under the assumption they have been ' +
    'already bumped. Just adds, commits tags and pushes.',

     function() {

        function set(options) {
            grunt.config('release.options', _.extend({
                additionalFiles: [ 'bower.json' ],
                tagName: 'v<%= version %>',
            }, options))
        }

        if (grunt.option('bump')) {
            set({
                bump: true,
                commit: false,
                push: false,
                tag: false,
                pushTags: false,
                add: false,
                npm: false,
            })
        }

        if (grunt.option('publish')) {
            set({
                bump: false,
                commit: true,
                push: true,
                tag: true,
                pushTags: true,
                add: true,
                npm: true,
            })
        }

        grunt.verbose.writeflags(grunt.config('release'), 'release')
        grunt.log.ok()
     })
}
