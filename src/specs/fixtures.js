define(function (require) {
    'use strict';

    var dataSelector    = require('data-selector')
    ,   nodeDescriptor  = require('node-descriptor')
    ,   _               = require('underscore')
    ,   qs              = _.bind(document.querySelector, document)
    ,   qsa             = _.bind(document.querySelectorAll, document)
    ,   f               = {}

    //----------------------------------
    //
    // Selectors
    //
    //----------------------------------

    f.appSelector           = dataSelector('app')
    f.componentSelector     = dataSelector('component')
    f.controllerSelector    = dataSelector('controller')
    f.viewSelector          = dataSelector('view')

    //----------------------------------
    //
    // Node descriptors
    //
    //----------------------------------

    f.appDescriptor = nodeDescriptor(f.appSelector, [
        f.componentSelector,
        f.controllerSelector
    ])

    f.componentDescriptor = nodeDescriptor(f.componentSelector, [
        f.componentSelector,
        f.controllerSelector,
        f.viewSelector
    ])

    f.controllerDescriptor = nodeDescriptor(f.controllerSelector)

    f.viewDescriptor  = nodeDescriptor(f.viewSelector, [
        f.viewSelector
    ])

    //----------------------------------
    //
    // Selections
    //
    //----------------------------------

    f.singleApp         = qs('.app')
    f.singleComponent   = qs('.component')
    f.singleController  = qs('.controller')
    f.singleView        = qs('.view')

    f.apps              = qsa('.app')
    f.components        = qsa('.component')
    f.controllers       = qsa('.controller')
    f.views             = qsa('.view')

    f.unknown           = qs('.unknown')

    return f
});
