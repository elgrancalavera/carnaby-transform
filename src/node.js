// Represents a node in a tree
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var _ = require('underscore')
    var $ = require('jquery')

    //----------------------------------
    //
    // Node
    //
    //----------------------------------

    /*
     * el:Element
     * rootSel: DataSelector
     * childSels: [DataSelector]
     */
    var Node = function(el, rootSel, childSels) {
        this.rootSel = rootSel
        this.childSels = childSels
        this.el = this.rootSel.validate(el)
        this.$el = $(this.el)
    }

    _.extend(Node.prototype, {
        name: function() {
            return this.rootSel.name(this.el)
        },
        /*
         * recursive:Boolan
         * boundaries:[DataSelector]
         */
        children: function(/*recursive, boundaries*/) {
            return []
        }
    })

    return Node
});
