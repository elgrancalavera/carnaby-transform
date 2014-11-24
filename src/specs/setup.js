// tests setup
// leon.coto@mcsaatchi.com
define(function (require) {
    'use strict';
    // var assert = chai.assert
    // var expect = chai.expect
    // var should = chai.should()
    var expect = require('chai').expect
    var $ = require('jquery')
    describe('Test setup', function() {
        it('`$` should not be undefined', function() {
            expect($).not.to.be.undefined()
        })
    })
});
