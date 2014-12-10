// Transforms DOM trees into a custom rule-based selector trees
// leon.coto@mcsaatchi.com
define(function (require) {

    // jshint unused:false

    'use strict';
    var $ = require('jquery')
    ,   _ = require('underscore')

    function findRule(el) {
        return function(rule) {
            return rule.isValidRoot(el)
        }
    }

    function testEl(rules) {
        return function(el) {
            var rule = _.find(rules, findRule(el))
            if (!rule) { return {} }
            return { el: el, rule: rule, children: [] }
        }
    }

    return function(rules) {
        var test = testEl(rules || [])
        return function(root) {
            return {
                tree: function() {
                    return test(root)
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
