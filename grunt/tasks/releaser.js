var lodash = require('lodash')

module.exports = function(grunt) {

    //--------------------------------------------------------------------------
    //
    // releaser
    //
    //--------------------------------------------------------------------------

    grunt.registerMultiTask(

        'releaser',

        'Dynamically configures "grunt-release" allowing the creation of ' +
        'individual release targets. Targets allows to split the release ' +
        'process of NPM modules in steps steps, for instance:\n' +
        '1. Version bumping\n' +
        '2. Publishing (committing, tagging, pushing and publishing to ' +
        'NPM)\n' +
        'In this case, a two steps process allows to run additonal tasks ' +
        'after bumping the project\'s versions, in case any task depends on ' +
        'the bumped version.\n',

        function() {
            grunt.log.ok(this.target)
            grunt.option('no-write', true) // while testing...


        })
}
