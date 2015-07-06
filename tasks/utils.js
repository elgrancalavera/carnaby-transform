'use strict';

var clean = require('amdclean').clean

module.exports = function(grunt){

  grunt.registerTask('bundle', function() {
    var options = this.options()
      , src = options.src
      , dest = options.dest
      , wrapper = umdReturnExports(options.wrapper)

    grunt.file.write(dest, clean({ filePath: src, wrap: wrapper }))
  })

  // https://github.com/umdjs/umd/blob/master/returnExports.js
  function umdReturnExports(wrapper) {
    return {
        start: grunt.template.process(grunt.file.read(wrapper.start))
      , end: grunt.template.process(grunt.file.read(wrapper.end))
    }
  }
}
