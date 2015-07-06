/*
 * Given a valid root element, describes how to transform the element's children
 */
define(function(require) {
  'use strict';

  var _ = require('underscore')

  function validateChild(el) {
    return function(sel) {
      return sel(el).isValid()
    }
  }

  return function(rootSelector, childSelectors) {
    childSelectors = childSelectors || []
    return {
      rootKey: function() {
        return rootSelector.selector()
      },
      childKey: function(el) {
        var sel = _.find(childSelectors, validateChild(el))
        return !!sel ? sel.selector() : undefined
      },
      rootSelector: function() {
        return rootSelector
      },
      isValidRoot: function(el) {
        return rootSelector(el).isValid()
      },
      isValidChild: function(el) {
        return _.some(childSelectors, validateChild(el))
      }
    }
  }
});
