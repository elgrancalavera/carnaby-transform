// Selections
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var expect  = require('chai').expect
    ,   f       = require('./fixtures')

    describe('data-selector', function () {

        it('Should match selector names', function() {
            expect(f.appSelector.selector()).to.equal('[data-app]')
            expect(f.componentSelector.selector()).to.equal('[data-component]')
            expect(f.controllerSelector.selector()).to.equal('[data-controller]')
            expect(f.viewSelector.selector()).to.equal('[data-view]')
        })

        it('Should match selector names with values', function() {
            expect(f.appSelector.selector('myapp')).to.equal('[data-app="myapp"]')
            expect(f.componentSelector.selector('mycomponent')).to.equal('[data-component="mycomponent"]')
            expect(f.controllerSelector.selector('mycontroller')).to.equal('[data-controller="mycontroller"]')
            expect(f.viewSelector.selector('myview')).to.equal('[data-view="myview"]')
        })

        it('Should select elements correctly', function() {
            expect(document.querySelectorAll(f.appSelector.selector()).length).to.equal(1)
            expect(document.querySelectorAll(f.componentSelector.selector()).length).to.equal(3)
            expect(document.querySelectorAll(f.controllerSelector.selector()).length).to.equal(4)
            expect(document.querySelectorAll(f.viewSelector.selector()).length).to.equal(11)
        })

        it('Should select elements with value correctly', function() {
            expect(document.querySelectorAll(f.viewSelector.selector('myviewone')).length).to.equal(4)
            expect(document.querySelectorAll(f.viewSelector.selector('myviewtwo')).length).to.equal(4)
        })

        it('Should reject non-matching elements', function() {
            expect(f.appSelector(f.unknown).isValid()).not.to.be.ok()
        })

        it('Nodes not matching a selector should not have any children', function() {
            expect(f.appSelector(f.unknown).children().length).to.equal(0)
        })

        it('Nodes matching a selector may have children', function() {
            expect(f.appSelector(f.singleApp).children().length).to.equal(3)
        })
    })
});
