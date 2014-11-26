// node-descriptor specs
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';
    var expect  = require('chai').expect
    ,   f       = require('./fixtures')

    describe('node-descriptor', function() {

        describe('simple nodes', function() {
            it('Should be a valid root', function() {
                expect(f.viewDescriptor.isValidRoot(f.singleView)).to.be.ok()
            })
            it('Should be an invalid root', function() {
                expect(f.viewDescriptor.isValidRoot(f.unknown)).not.to.be.ok()
            })
            it('Should be a valid child', function() {
                expect(f.viewDescriptor.isValidChild(f.singleView)).to.be.ok()
            })
        })

        describe('complex nodes', function() {
            it('Should allow several child nodes', function() {
                expect(f.componentDescriptor.isValidChild(f.singleComponent)).to.be.ok()
                expect(f.componentDescriptor.isValidChild(f.singleController)).to.be.ok()
                expect(f.componentDescriptor.isValidChild(f.singleView)).to.be.ok()
            })
        })
    })
});
