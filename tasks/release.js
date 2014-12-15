'use strict';
var semver = require('semver')

module.exports = function(grunt) {

    function writeJSON(filepath, object) {
        grunt.file.write(filepath, JSON.stringify(object, null, 2))
    }

    function nextVersion(level) {
        return semver.inc(grunt.config('pkg.version'), level)
    }

    function bumpVersion(filepath, version) {
        var data = grunt.file.readJSON(filepath)
        data.version = version
        writeJSON(filepath, data)
    }

    function updateMetaFiles(version) {
        grunt.config('files.meta').forEach(function(filepath) {
            bumpVersion(filepath, version)
        })
        grunt.config('pkg', grunt.file.readJSON('package.json'))
        grunt.log.ok('Version bumped to: ' + grunt.config('pkg.version'))
    }

    function release(version) {
        updateMetaFiles(version)
        grunt.task.run('default')
    }

    grunt.registerTask('release:major',
    'Bumps major the version and builds the project.',
    function() {
        release(nextVersion('major'))
    })

    grunt.registerTask('release:minor',
    'Bumps minor the version and builds the project.',
    function() {
        release(nextVersion('minor'))
    })

    grunt.registerTask('release:patch',
    'Bumps patch the version and builds the project.',
    function() {
        release(nextVersion('patch'))
    })
}
