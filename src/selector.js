/*
 * Validate DOM elements against arbitrary `data-*` attributes.
 */
define(function(require) {

  'use strict';

  var _ = require('underscore')

  function selectorValue(value) {
    return _.isString(value) ? '="' + value + '"' : ''
  }

  function attribute(name) {
    return 'data-' + name
  }

  function selector(name, value) {
    return '[' + attribute(name) + selectorValue(value) + ']'
  }

  function matches(el, selector) {
    return (
        el.matches ||
        el.matchesSelector ||
        el.msMatchesSelector ||
        el.mozMatchesSelector ||
        el.webkitMatchesSelector ||
        el.oMatchesSelector
      ).call(el, selector)
  }

  return function(name) {
    var sel = function(el) {
      var valid = matches(el, selector(name))

      return {
        value: function() {
          return valid ? el.getAttribute(attribute(name)) : undefined
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
