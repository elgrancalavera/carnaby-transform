define(function (require) {
    'use strict';

    var dataSelector    = require('data-selector')
    ,   _               = require('underscore')
    ,   node            = require('node')
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
    // Nodes
    //
    //----------------------------------

    f.viewNode = node(f.viewSelector)
    f.viewNode.allowChild(f.viewNode)

    //----------------------------------
    //
    // Selections
    //
    //----------------------------------

    f.app           = qsa('.app')
    f.components    = qsa('.component')
    f.controllers   = qsa('.controller')
    f.views         = qsa('.view')
    f.unknown       = qs('.unknown')
    f.nestedViews   = qs('.app .component.three .view.two')

    return f
});
