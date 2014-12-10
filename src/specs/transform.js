// specs/transform
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';
    var f           = require('./fixtures')
    ,   expect      = require('chai').expect

    describe('transform', function() {
        it('Should reject invalid roots', function() {
            expect(f.appTransform(f.unknown).tree()).to.deep.equal({})
        })
        it('Should accept valid roots', function() {
            var tree = f.appTransform(f.singleApp).tree()
            expect(tree.el).to.equal(f.singleApp)
        })
        it('Nodes should include a valid rule', function() {
            var tree = f.appTransform(f.singleApp).tree()
            expect(tree.rule).to.deep.equal(f.appRule)
        })
    })
});
