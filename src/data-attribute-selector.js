// Represents a `data-*` selector used to target nodes in the DOM
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var _ = require('underscore')

    var DataAttributeSelector = function(name) {
        this.name = name
    }

    _.extend(DataAttributeSelector.prototype, {
        selector: function() {
            return '[' + this.name + ']'
        },
        testElement: function($el) {
            return $el.is(this.selector())
        },
        validate: function($el) {
            if (!this.test($el)) {
                throw new Error('Invalid element: the data-* attribute "' + this.name + '" is wrong or missing.')
            }
        },
        children: function($el) {
            this.validate($el)
            return $el.find('> *')
        }
    })

    return DataAttributeSelector
});
