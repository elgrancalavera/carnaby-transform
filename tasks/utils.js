'use strict';

var amdclean = require('amdclean')

module.exports = function(grunt){

  grunt.registerTask('bundle', function() {
    grunt.file.write(
        this.options().dest
      , amdclean.clean({
          filePath: this.options().src
        , wrap: umdReturnExports(this.options().wrapper)
        })
      )
  })

  // https://github.com/umdjs/umd/blob/master/returnExports.js
  function umdReturnExports(wrapper) {
    return {
        start: grunt.template.process(grunt.file.read(wrapper.start))
      , end: grunt.template.process(grunt.file.read(wrapper.end))
    }
  }
}
