/*
 * Validate DOM elements against arbitrary `data-*` attributes.
 */
define(['underscore', 'jquery'], function (_, $) {

    'use strict';

    function selectorValue(value) {
        return _.isString(value) ? '="' + value + '"' : ''
    }

    function selector(name, value) {
        return '[data-' + name + selectorValue(value) + ']'
    }

    return function(name) {
        var sel = function(el) {
            var $el = $(el)
            var valid = $el.is(selector(name))
            return {
                value: function() {
                    return valid ? $el.attr(name) : undefined
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
