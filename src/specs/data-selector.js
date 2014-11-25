// Selections
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';

    var expect = require('chai').expect
    var fixtures = require('./fixtures')

    describe('DataSelector', function () {

        it('Should match selector names', function() {
            expect(fixtures.appSelector.selector()).to.equal('[data-app]')
            expect(fixtures.componentSelector.selector()).to.equal('[data-component]')
            expect(fixtures.controllerSelector.selector()).to.equal('[data-controller]')
            expect(fixtures.viewSelector.selector()).to.equal('[data-view]')
        })

        it('Should match selector names with values', function() {
            expect(fixtures.appSelector.selector('myapp')).to.equal('[data-app="myapp"]')
            expect(fixtures.componentSelector.selector('mycomponent')).to.equal('[data-component="mycomponent"]')
            expect(fixtures.controllerSelector.selector('mycontroller')).to.equal('[data-controller="mycontroller"]')
            expect(fixtures.viewSelector.selector('myview')).to.equal('[data-view="myview"]')
        })

        it('Should select elements correctly', function() {
            expect(document.querySelectorAll(fixtures.appSelector.selector()).length).to.equal(1)
            expect(document.querySelectorAll(fixtures.componentSelector.selector()).length).to.equal(3)
            expect(document.querySelectorAll(fixtures.controllerSelector.selector()).length).to.equal(4)
            expect(document.querySelectorAll(fixtures.viewSelector.selector()).length).to.equal(11)
        })

        it('Should select elements with value correctly', function() {
            expect(document.querySelectorAll(fixtures.viewSelector.selector('myviewone')).length).to.equal(4)
            expect(document.querySelectorAll(fixtures.viewSelector.selector('myviewtwo')).length).to.equal(4)
        })

        it('Should reject non-matching elements', function() {
            expect(fixtures.appSelector(fixtures.unknown)).not.to.be.ok()
        })

        it('Nodes not matching a selector should not have any children', function() {
            expect(fixtures.appSelector.children(fixtures.unknown).length).to.equal(0)
        })

        it('Nodes matching a selector may have children', function() {
            expect(fixtures.appSelector.children(fixtures.app).length).to.equal(3)
        })
    })
});
