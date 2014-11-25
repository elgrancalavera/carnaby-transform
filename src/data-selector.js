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

    function selectorName(value) {
        return _.isString(value) ? '="' + value + '"' : ''
    }

    function selector(dataSelector, value) {
        return '[data-' + dataSelector.name + selectorName(value) + ']'
    }

    //----------------------------------
    //
    // DataSelector
    //
    //----------------------------------

    var DataSelector = function(name) {
        this.name = name
    }

    _.extend(DataSelector.prototype, {
        test: function(el) {
            return $(el).is(this.selector())
        },
        selector: function(value) {
            return selector(this, value)
        },
        children: function(el) {
            return this.test(el) ? $(el).children().toArray() : []
        }
    })

    return DataSelector
});
