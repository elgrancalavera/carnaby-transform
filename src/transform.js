// Transforms DOM trees into a custom rule-based selector trees
// leon.coto@mcsaatchi.com
define(function (require) {


    'use strict';
    var $ = require('jquery')
    ,   _ = require('underscore')

    function makeRuleFinder(rules) {
        return function (el) {
            return _.find(rules, function(rule) {
                return rule.isValidRoot(el)
            })
        }
    }

    function childElements(el) {
        return $(el).children()
    }

    function node(el, rule) {
        if (!rule) { return }
        return { el: el, rule: rule }
    }

    function childIterator(parentRule, findRule) {
        return function (children, candidate) {
            var childNode = node(candidate, findRule(candidate))
            if (parentRule.isValidChild(candidate) && !!childNode) {
                children.push(nodeIterator(childNode, findRule))
            } else {
                children = children.concat(childReducer(candidate, parentRule, findRule))
            }
            return children
        }
    }

    function childReducer(el, parentRule, findRule) {
        return _.reduce(childElements(el), childIterator(parentRule, findRule), [])
    }

    function nodeIterator(currentNode, findRule) {
        if (!currentNode) { return }
        currentNode.children = childReducer(currentNode.el, currentNode.rule, findRule)
        return currentNode
    }

    return function(rules) {
        var findRule = makeRuleFinder(rules || [])
        return function(root) {
            root = node(root, findRule(root))
            return {
                tree: function() {
                    return nodeIterator(root, findRule)
                }
            }
        }
    }
});

/*

//--------------------------------------------------------------------------
//
// Trees
//
//--------------------------------------------------------------------------

//----------------------------------
//
// Empty tree
//
//----------------------------------

{}

//----------------------------------
//
// Single element tree
//
//----------------------------------

{
    el: el,
    rule: rule,
    children: []
}

//----------------------------------
//
// Multiple element tree
//
//----------------------------------

{
    el: el,
    rule: rule,
    children:
    [
        {
            el: el,
            children: []
        },
        {
            el: el,
            children: []
        }
    ]
}

//--------------------------------------------------------------------------
//
// Lists
//
//--------------------------------------------------------------------------

//----------------------------------
//
// Empty list
//
//----------------------------------

[]

//----------------------------------
//
// List
//
//----------------------------------

[
    { el: el, rule: rule, children: [ ... ] },
    { el: el, rule: rule, children: [ ... ] },
    { el: el, rule: rule, children: [ ... ] },
    { el: el, rule: rule, children: [ ... ] },
    { el: el, rule: rule, children: [ ... ] },
    { el: el, rule: rule, children: [ ... ] },
    { el: el, rule: rule, children: [ ... ] },
]
*/
