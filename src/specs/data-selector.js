// Selections
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';
    var expect = require('chai').expect
    var DataSelector = require('data-selector')

    describe('DataSelector', function () {

        before(function(){
            this.appSelector = new DataSelector('app')
            this.componentSelector = new DataSelector('component')
            this.controllerSelector = new DataSelector('controller')
            this.viewSelector = new DataSelector('view')
            this.app = document.querySelectorAll('.app')
            this.components = document.querySelectorAll('.component')
            this.controllers = document.querySelectorAll('.controller')
            this.views = document.querySelectorAll('.view')
            this.unknown = document.querySelector('.unknown')
        })

        it('Should match selector names', function() {
            expect(this.appSelector.selector()).to.equal('[data-app]')
            expect(this.componentSelector.selector()).to.equal('[data-component]')
            expect(this.controllerSelector.selector()).to.equal('[data-controller]')
            expect(this.viewSelector.selector()).to.equal('[data-view]')
        })

        it('Should match selector names with values', function() {
            expect(this.appSelector.selector('myapp')).to.equal('[data-app="myapp"]')
            expect(this.componentSelector.selector('mycomponent')).to.equal('[data-component="mycomponent"]')
            expect(this.controllerSelector.selector('mycontroller')).to.equal('[data-controller="mycontroller"]')
            expect(this.viewSelector.selector('myview')).to.equal('[data-view="myview"]')
        })

        it('Should select elements correctly', function() {
            expect(document.querySelectorAll(this.appSelector.selector()).length).to.equal(1)
            expect(document.querySelectorAll(this.componentSelector.selector()).length).to.equal(3)
            expect(document.querySelectorAll(this.controllerSelector.selector()).length).to.equal(4)
            expect(document.querySelectorAll(this.viewSelector.selector()).length).to.equal(8)
        })

        it('Should select elements with value correctly', function() {
            expect(document.querySelectorAll(this.viewSelector.selector('myviewone')).length).to.equal(4)
            expect(document.querySelectorAll(this.viewSelector.selector('myviewtwo')).length).to.equal(4)
        })

        it('Should reject non-matching elements', function() {
            expect(this.appSelector.test(this.unknown)).not.to.be.ok()
        })

        it('Nodes not matching a selector should not have any children', function() {
            expect(this.appSelector.children(this.unknown).length).to.equal(0)
        })

        it('Nodes matching a selector may have children', function() {
            expect(this.appSelector.children(this.app).length).to.equal(3)
        })
    })
});
