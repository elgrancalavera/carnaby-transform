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
        name: function(el) {
            return $(this.validate(el)).attr(this.name)
        },
        test: function(el) {
            return $(el).is(this.selector())
        },
        selector: function(value) {
            return selector(this, value)
        },
        children: function(el) {
            // should this throw?
            return this.test(el) ? $(el).children().toArray() : []
        },
        validate: function(el) {
            if (!this.test(el)) {
                throw new Error('Invalid element for selector `' + this.selector() + '`')
            }
            return el
        }
    })

    return DataSelector
});
