// rule specs
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';
    var expect  = require('chai').expect
    ,   f       = require('./fixtures')

    describe('rule', function() {

        describe('simple nodes', function() {
            it('Should be a valid root', function() {
                expect(f.viewRule.isValidRoot(f.singleView)).to.be.ok()
            })
            it('Unknown node be an invalid root', function() {
                expect(f.viewRule.isValidRoot(f.unknown)).not.to.be.ok()
            })
            it('Known node but wrong description', function() {
                expect(f.viewRule.isValidRoot(f.singleApp)).not.to.be.ok()
            })
            it('Should be a valid child', function() {
                expect(f.viewRule.isValidChild(f.singleView)).to.be.ok()
            })
            it('Known node but invalid child', function() {
                expect(f.viewRule.isValidChild(f.singleApp)).not.to.be.ok()
            })
            it('Unknown node', function() {
                expect(f.viewRule.isValidChild(f.unknown)).not.to.be.ok()
            })
        })

        describe('complex nodes', function() {
            it('Should allow several child nodes', function() {
                expect(f.componentRule.isValidChild(f.singleComponent)).to.be.ok()
                expect(f.componentRule.isValidChild(f.singleController)).to.be.ok()
                expect(f.componentRule.isValidChild(f.singleView)).to.be.ok()
            })
        })

        describe('retrieving keys', function() {
            it('A root descriptor key should match a selector', function() {
                expect(f.viewRule.rootKey()).to.equal(f.viewSelector.selector())
            })
            it('A child descriptor key should match a selector', function() {
                expect(f.componentRule.childKey(f.singleController)).to.equal(f.controllerSelector.selector())
            })
            it('A known selector not allowed by the descriptor should not return a key', function() {
                expect(f.viewRule.childKey(f.singleApp)).not.to.be.ok()
            })
            it('An unknown child should not return a key', function() {
                expect(f.viewRule.childKey(f.unknown)).not.to.be.ok()
            })
        })
    })
});
