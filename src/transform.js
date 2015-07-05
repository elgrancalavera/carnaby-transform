/*
 * Given an array of `rule` functions, describes transforms a DOM tree into
 * a custom element tree.
 */
define(['underscore', 'jquery'], function (_, $) {

    'use strict';

    function children(el) {
        return $(el).children()
    }

    function ruleFinder(rules, el) {
        return _.find(rules, function(rule) {
            return rule.isValidRoot(el)
        })
    }

    function node(el, rule) {
        if (!rule) { return }
        return { el: el, rule: rule }
    }

    function validChild(node, parentRule) {
        return !!node && parentRule.isValidChild(node.el)
    }

    return function(rules) {

        var findRule = _.partial(ruleFinder, rules || [])

        function childIterator(parentRule, children, candidate) {
            var child = node(candidate, findRule(candidate))
            if (validChild(child, parentRule)) {
                return children.concat(nodeIterator(child))
            }
            return children.concat(childReducer(candidate, parentRule))
        }

        function childReducer(el, parentRule) {
            return _.reduce(children(el), _.partial(childIterator, parentRule), [])
        }

        function nodeIterator(currentNode) {
            if (!currentNode) { return }
            currentNode.children = childReducer(currentNode.el, currentNode.rule)
            return currentNode
        }

        return function(root) {
            return nodeIterator(node(root, findRule(root)))
        }
    }
});
