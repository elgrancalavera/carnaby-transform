define(function (require) {
    'use strict';
    var dataSelector = require('data-selector')
    return {

        //----------------------------------
        //
        // Selectors
        //
        //----------------------------------

        appSelector: dataSelector('app'),
        componentSelector: dataSelector('component'),
        controllerSelector: dataSelector('controller'),
        viewSelector: dataSelector('view'),

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
