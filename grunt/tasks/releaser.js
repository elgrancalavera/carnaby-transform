var _ = require('lodash')

module.exports = function(grunt) {

    function rawOptions(key) {
        return _.cloneDeep(grunt.config.getRaw(key))
    }

    function rawOptionsForTask(task) {
        return _.extend({},
            rawOptions([task.name, 'options'].join('.')),
            rawOptions([task.name, task.target, 'options'].join('.'))
        )
    }

    function verifyGruntRelease() {
        if (!grunt.task.exists('release')) {
            grunt.fail.fatal('grunt-releaser requires grunt-release')
        }
    }

    //--------------------------------------------------------------------------
    //
    // reloadpkg
    //
    //--------------------------------------------------------------------------

    grunt.registerTask('reloadpkg', function() {
        grunt.config('pkg', grunt.file.readJSON('package.json'))
        grunt.log.ok('package.json reloaded.')
    })

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
        '2. Releasing (committing, tagging, pushing and publishing to ' +
        'NPM)\n' +
        'In this case, a two steps process allows to run additonal tasks ' +
        'after bumping the project\'s versions, in case any task depends on ' +
        'the bumped version.\n',

        function(type) {
            verifyGruntRelease()
            var options = rawOptionsForTask(this)
            grunt.config('release.options', options)
            var taskList = [ 'release' + (!!type ? ':' + type : '') ]
            if (options.reloadpkg) { taskList.push('reloadpkg') }
            grunt.task.run(taskList)
        })
}
