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

        var opts = this.options()

        function set(options) {
            grunt.config('release.options', _.extend({}, opts.base, options))
        }

        if (grunt.option('bump')) {
            set(opts.bump)
        }

        if (grunt.option('publish')) {
            set(opts.publish)
        }

        grunt.verbose.writeflags(grunt.config('release'), 'release')
        grunt.log.ok()
     })
}
