// specs/transform
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';
    var f           = require('./fixtures')
    ,   _           = require('underscore')
    ,   expect      = require('chai').expect

    describe('transform', function() {

        describe('roots:', function() {
            it('Should reject invalid roots.', function() {
                expect(f.appTransform(f.unknown).tree()).not.to.be.ok()
            })
            it('Should accept valid roots.', function() {
                var tree = f.appTransform(f.singleApp).tree()
                expect(tree.el).to.equal(f.singleApp)
            })
            it('Any element that matches a rule can be a valid root.', function() {
                var tree = f.appTransform(f.singleComponent).tree()
                expect(tree.el).to.equal(f.singleComponent)
            })
        })

        describe('nodes:', function() {
            it('Nodes should include a valid rule.', function() {
                var tree = f.appTransform(f.singleApp).tree()
                expect(tree.rule).to.deep.equal(f.appRule)
            })
        })

        describe('children:', function() {
            it('Only elements matching children rules should be valid.', function() {
                var tree = f.appTransform(f.singleApp).tree()
                expect(tree.children.length).to.equal(4)
            })
            it('All children should be found recursively.', function() {
                var tree = f.appTransform(f.singleApp).tree()

                // sanity check
                expect(_.pluck(tree.children, 'el')).to.contain(f.componentOne)

                var componentOne = _.find(tree.children, function(node) {
                    return node.el.className === 'component one'
                })
                expect(componentOne.children.length).to.equal(2)
            })
        })
    })
});
