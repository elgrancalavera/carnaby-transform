// node specs
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var expect  = require('chai').expect
    ,   f       = require('./fixtures')

    describe('Node', function() {

        it('Should accept valid nodes', function() {
            expect(f.viewNode(f.nestedViews)).to.be.ok()
        })

        it('Should reject invalid nodes', function() {
            expect(f.viewNode(f.unknown)).not.to.be.ok()
        })

        it('Should match selection', function() {
            expect(f.viewNode.tree(f.nestedViews).el).to.equal(f.nestedViews)
        })

        it('Should contain all children', function() {
            expect(f.viewNode.tree(f.nestedViews).children.length).to.equal(3)
        })
    })

});
