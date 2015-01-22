
'use strict';

var path        = require('path')
,   _           = require('lodash')
,   amdclean    = require('amdclean')

module.exports = function(grunt){

    var u = {}

    //--------------------------------------------------------------------------
    //
    // AMD_to_UMD_returnExports
    //
    //--------------------------------------------------------------------------

    // https://www.npmjs.com/package/amdclean
    u.AMD_to_UMD_returnExports = function(data) {
        var src     = path.join(grunt.config('paths.requirejs.build'), data.path)
        ,   dest    = path.join(grunt.config('paths.dist'), data.path)
        ,   start   = grunt.template.process(grunt.file.read(grunt.config('paths.wrap.start')))
        ,   end     = grunt.template.process(grunt.file.read(grunt.config('paths.wrap.end')))
        grunt.file.write(dest, amdclean.clean({
            filePath: src,
            // https://github.com/umdjs/umd/blob/master/returnExports.js
            wrap: { start: start, end: end }
        }))
    }

    return u
}
