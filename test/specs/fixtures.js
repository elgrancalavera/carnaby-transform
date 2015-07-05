// specs/fixtures
// leon.coto@mcsaatchi.com

define(function (require) {
    'use strict';

    var transform   = require('transform')
    ,   selector    = transform.selector
    ,   rule        = transform.rule
    ,   _           = require('underscore')
    ,   qs          = _.bind(document.querySelector, document)
    ,   qsa         = _.bind(document.querySelectorAll, document)
    ,   f           = {}

    //----------------------------------
    //
    // selector
    //
    //----------------------------------

    f.appSelector           = selector('app')
    f.componentSelector     = selector('component')
    f.controllerSelector    = selector('controller')
    f.viewSelector          = selector('view')

    //----------------------------------
    //
    // rule
    //
    //----------------------------------

    f.appRule = rule(f.appSelector, [
        f.componentSelector,
        f.controllerSelector
    ])

    f.componentRule = rule(f.componentSelector, [
        f.componentSelector,
        f.controllerSelector,
        f.viewSelector
    ])

    f.controllerRule = rule(f.controllerSelector)

    f.viewRule  = rule(f.viewSelector, [
        f.viewSelector
    ])

    //----------------------------------
    //
    // transform
    //
    //----------------------------------

    f.appTransform = transform([
        f.appRule,
        f.componentRule,
        f.controllerRule,
        f.viewRule
    ])

    //----------------------------------
    //
    // DOM selections
    //
    //----------------------------------

    f.singleApp         = qs('.app')
    f.singleComponent   = qs('.component')
    f.componentOne      = qs('.component.one')
    f.singleController  = qs('.controller')
    f.singleView        = qs('.view')

    f.apps              = qsa('.app')
    f.components        = qsa('.component')
    f.controllers       = qsa('.controller')
    f.views             = qsa('.view')

    f.unknown           = qs('.unknown')

    return f
});
