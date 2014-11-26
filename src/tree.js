// tree
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';
    var _ = require('underscore')



    return function(/* all arguments are node-descriptors */) {
        var nodeDescriptors = _.toArray(arguments)
        var tree = function(/*el*/) {

        }
        tree.nodeDescriptors = function () {
            return nodeDescriptors
        }
        return tree
    }
});
