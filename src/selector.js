// Selects elements and its children
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var _ = require('underscore')
    ,   $ = require('jquery')

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
                children: function() {
                    return valid ? $el.children().toArray() : []
                },
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
