/*
 * Validate DOM elements against arbitrary `data-*` attributes.
 */
define(function(require) {

  'use strict';

  var _ = require('underscore')
    , $ = require('jquery')

  function selectorValue(value) {
    return _.isString(value) ? '="' + value + '"' : ''
  }

  function attribute(name) {
    return 'data-' + name
  }

  function selector(name, value) {
    return '[' + attribute(name) + selectorValue(value) + ']'
  }

  return function(name) {
    var sel = function(el) {
      var $el = $(el)
        , valid = $el.is(selector(name))
      return {
        value: function() {
          return valid ? $el.attr(attribute(name)) : undefined
        },
        isValid: function() {
          return valid
        }
      }
    }
    sel.selector = function(value) {
      return selector(name, value)
    }
    return sel
  }
});
