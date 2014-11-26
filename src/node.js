// Represents a node in a tree
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var _ = require('underscore')

    // probably something like passing a node as a root
    // and finding the children based on termination (boundaries/recursive)
    // selection (children)
    // and continuation (recursive)


    // maybe we need to pass the tree description, like
    // tree = {}
    // tree[appSelector.selector()]         = [componentSelector, controllerSelector]
    // tree[componentSelector.selector()]   = [componentSelector, controllerSelector, viewSelector]
    // tree[controllerSelector.selector()]  = []
    // tree[viewSelector.selector()]        = [viewSelector]

    return function(rootSel) {

        var allowedChildren = []

        function childNode(/*el*/) {
            return false
        }

        function children(el) {
            return _.reduce(rootSel.children(el), function(_children, el) {
                // find matching node factory for el
                var child = childNode(el)
                if (!!child) {
                    _children.push(node.tree(el))
                }
                return _children
            }, [])
        }

        var node = function(el) {
            return rootSel(el)
        }

        node.tree = function(el) {
            return {
                el: rootSel.validate(el),
                selector: rootSel,
                children: children(el)
            }
        }

        node.allowChild = function (childNode) {
            allowedChildren = _.uniq(allowedChildren.concat(childNode))
            return node
        }

        return node
    }
});
