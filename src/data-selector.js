// Selects elements based on data-* attributes.
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var _ = require('underscore')
    var $ = require('jquery')

    //----------------------------------
    //
    // selectors
    //
    //----------------------------------

    function selectorValue(value) {
        return _.isString(value) ? '="' + value + '"' : ''
    }

    function selector(name, value) {
        return '[data-' + name + selectorValue(value) + ']'
    }

    //----------------------------------
    //
    // dataSelector
    //
    //----------------------------------

    return function(name) {

        var sel = function(el) {
            return $(el).is(selector(name))
        }

        sel.validate = function(el) {
            if(!sel(el)) {
                throw new Error('Invalid element for selector `' + selector(name) + '`')
            }
            return el
        }

        sel.selector = function(value) {
            return selector(name, value)
        }

        sel.children = function(el) {
            // should this throw?
            return sel(el) ? $(el).children().toArray() : []
        }

        sel.value = function(el) {
            return $(sel.validate(el)).attr(name)
        }

        return sel
    }
});
