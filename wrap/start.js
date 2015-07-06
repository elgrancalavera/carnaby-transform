//--------------------------------------------------------------------------
//
// carnaby.transform
// Copyright (c) <%= grunt.template.today('yyyy') %> M&C Saatchi
// Distributed under MIT license
//
//--------------------------------------------------------------------------

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('underscore'), require('jquery'));
  } else {
    root.transform = factory(root._, root.$);
  }
})(this, function(underscore, jquery) {

