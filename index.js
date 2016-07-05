"use strict";
var fileExpectedResults = require('./src/expected-result-file.js');

var matchers = {

    toEqualFileContents: function() {
        return {
            compare: function(actual, specName) {
                var ret = {
                    pass: fileExpectedResults.getExpectedResult(specName).then(function(expected) {
                        var pass = expected == actual;
                        ret.message = "Expected '" + actual + "' to Equal '" + expected + "'.";
                        if(!pass) {
                            fileExpectedResults.saveExpectedResult(specName, actual);
                        }
                        return pass;
                    })
                };
                return ret;
            }
        };
    },

    toContainFileContents: function() {
        return {
            compare: function(actual, specName) {
                var ret = {
                    pass: fileExpectedResults.getExpectedResult(specName).then(function(expected) {
                        var pass = actual.includes(expected);
                        ret.message = "Expected '" + actual + "' to Contain '" + expected + "'.";
                        if(!pass) {
                            fileExpectedResults.saveExpectedResult(specName, actual);
                        }
                        return pass;
                    })
                };
                return ret;
            }
        };
    },

    toEqualFileContentsIgnoreLineBreaks: function() {
        return {
            compare: function(actual, specName) {
                var ret = {
                    pass: fileExpectedResults.getExpectedResult(specName).then(function(expected) {
                        actual = actual.replace(/\n/g, '');
                        expected = expected.replace(/\n/g, '');
                        var pass = expected == actual;
                        ret.message = "Expected '" + actual + "' to Equal '" + expected + "'.";
                        if(!pass) {
                            fileExpectedResults.saveExpectedResult(specName, actual);
                        }
                        return pass;
                    })
                };
                return ret;
            }
        };
    }
};

beforeEach(function() {
    jasmine.addMatchers(matchers);
});
