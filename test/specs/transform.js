// specs/transform
// leon.coto@mcsaatchi.com
define(function (require) {

  'use strict';

  var f = require('./fixtures')
    , _ = require('underscore')
    , expect = require('chai').expect

  function findChild(parent, by) {
    by = by || function() { return false }
    return _.find(parent.children, by)
  }

  function byClassName(className, child) {
    return child.el.className === className
  }

  describe('transform', function() {

    describe('roots:', function() {
      it('Should reject invalid roots.', function() {
        expect(f.appTransform(f.unknown)).not.to.be.ok()
      })
      it('Should accept valid roots.', function() {
        var tree = f.appTransform(f.singleApp)
        expect(tree.el).to.equal(f.singleApp)
      })
      it('Any element that matches a rule can be a valid root.', function() {
        var tree = f.appTransform(f.singleComponent)
        expect(tree.el).to.equal(f.singleComponent)
      })
    })

    describe('nodes:', function() {
      it('Nodes should include a valid rule.', function() {
        var tree = f.appTransform(f.singleApp)
        expect(tree.rule).to.deep.equal(f.appRule)
      })
    })

    describe('children:', function() {
      it('Only elements matching children rules should be valid.', function() {
        var tree = f.appTransform(f.singleApp)
        expect(tree.children.length).to.equal(4)
      })

      it('All children should be found recursively.', function() {

        var root = f.appTransform(f.singleApp)

        var componentOne = findChild(root, _.partial(byClassName, 'component one'))
        expect(componentOne).to.be.ok()
        expect(componentOne.children.length).to.equal(2)

        var viewOne = findChild(componentOne, _.partial(byClassName, 'view one'))
        expect(viewOne).to.be.ok()
        expect(viewOne.children.length).to.equal(1)
      })
    })
  })
});
