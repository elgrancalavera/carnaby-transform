// describes the root and children of a node
// leon.coto@mcsaatchi.com
define(function () {
    'use strict';
    var _ = require('underscore')

    function validateChild(el) {
        return function(sel) {
            return sel(el).isValid()
        }
    }

    return function(rootSel, childSels) {
        childSels = childSels || []
        return {
            rootKey: function() {
                return rootSel.selector()
            },
            childKeyFor: function(el) {
                var sel = _.find(childSels, validateChild(el))
                return !!sel ? sel.selector() : undefined
            },
            isValidRoot: function(el) {
                return rootSel(el).isValid()
            },
            isValidChild: function(el) {
                return _.some(childSels, validateChild(el))
            }
        }
    }
});
