define(function (require) {
    'use strict';
    var DataSelector = require('data-selector')
    return {

        //----------------------------------
        //
        // Selectors
        //
        //----------------------------------

        appSelector: new DataSelector('app'),
        componentSelector: new DataSelector('component'),
        controllerSelector: new DataSelector('controller'),
        viewSelector: new DataSelector('view'),

        //----------------------------------
        //
        // Selections
        //
        //----------------------------------

        app: document.querySelectorAll('.app'),
        components: document.querySelectorAll('.component'),
        controllers: document.querySelectorAll('.controller'),
        views: document.querySelectorAll('.view'),
        unknown: document.querySelector('.unknown'),

    }
});
