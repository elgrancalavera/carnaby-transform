// describes the root and children of a node
// leon.coto@mcsaatchi.com
define(function () {
    'use strict';
    var _ = require('underscore')

    return function(rootSel, childSels) {
        return {
            key: function() {
                return rootSel.selector()
            },
            isValidRoot: function(el) {
                return rootSel(el).isValid()
            },
            isValidChild: function(el) {
                return _.some(childSels || [], function(sel) {
                    return sel(el).isValid()
                })
            }
        }
    }
});
