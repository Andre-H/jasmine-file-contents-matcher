"use strict";
var Promise = require('promise');
var fs = require('fs');
var path = require('path');
const expectedResultsFolder = 'resources/expectedresults';

function sanitizeFilename(name) {
    name = name.replace(/\s+/g, '-'); // Replace white space with dash
    return name.replace(/[^0-9a-zA-Z\-]/gi, ''); // Strip any special characters except the dash
}

var matchers = {

    toEqualFileContents: function(defaultMatchers) {
        return {
            compare: function(expected, uniqueIdentifier, done) {

                var fullFilePath = path.resolve(expectedResultsFolder, sanitizeFilename(uniqueIdentifier) + '.txt');

                var readFilePromise = new Promise(function(resolve, reject) {
                    fs.readFile(fullFilePath, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });

                readFilePromise.then(function(actual) {
                    if(defaultMatchers.equals(expected.toString().replace(/(\r\n)/g,'\n'), actual.toString().replace(/(\r\n)/g,'\n'))){
                        return done();//{pass:true};
                    }
                    done.fail("Expected '" + expected.toString().replace(/(\r\n)/g,'\n') + "' to Equal '" + actual.toString().replace(/(\r\n)/g,'\n') + "'.");//('kaboing');
                }).catch(function(error) {
                    done.fail(error);
                });

                return{pass:true};
            },
            negativeCompare : function (expected, uniqueIdentifier, done){

                var fullFilePath = path.resolve(expectedResultsFolder, sanitizeFilename(uniqueIdentifier) + '.txt');

                var readFilePromise = new Promise(function(resolve, reject) {
                    fs.readFile(fullFilePath, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });

                readFilePromise.then(function(actual) {
                    if(defaultMatchers.equals(expected.toString().replace(/(\r\n)/g,'\n'), actual.toString().replace(/(\r\n)/g,'\n'))){
                        done.fail("Expected '" + actual + "' to Equal '" + expected + "'.");//('kaboing');
                    }
                    return done();//{pass:true};
                }).catch(function(error) {
                    done.fail(error);
                });
                return{pass:true};
            }
        };
    },

    toContainFileContents: function(defaultMatchers) {
        return {
            compare: function(expected, uniqueIdentifier, done) {

                var fullFilePath = path.resolve(expectedResultsFolder, sanitizeFilename(uniqueIdentifier) + '.txt');

                var readFilePromise = new Promise(function(resolve, reject) {
                    fs.readFile(fullFilePath, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });

                readFilePromise.then(function(actual) {
                    if(defaultMatchers.contains(expected.toString().replace(/(\r\n)/g,'\n'),actual.toString().replace(/(\r\n)/g,'\n'))){
                        return done();//{pass:true};
                    }
                    done.fail("Expected '" + expected.toString().replace(/(\r\n)/g,'\n') + "' to Contain '" + actual.toString().replace(/(\r\n)/g,'\n') + "'.");//('kaboing');
                }).catch(function(error) {
                    done.fail(error);
                });

                return{pass:true};
            },
            negativeCompare : function (expected, uniqueIdentifier, done){

                var fullFilePath = path.resolve(expectedResultsFolder, sanitizeFilename(uniqueIdentifier) + '.txt');

                var readFilePromise = new Promise(function(resolve, reject) {
                    fs.readFile(fullFilePath, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });

                readFilePromise.then(function(actual) {
                    if(defaultMatchers.contains(expected.toString().replace(/(\r\n)/g,'\n'),actual.toString().replace(/(\r\n)/g,'\n'))){
                        done.fail("Expected '" + actual + "' to Contain '" + expected + "'.");//('kaboing');
                    }
                    return done();//{pass:true};
                }).catch(function(error) {
                    done.fail(error);
                });
                return{pass:true};
            }
        };
    },

    toEqualFileContentsIgnoreLineBreaks: function(defaultMatchers) {
        return {
            compare: function(expected, uniqueIdentifier, done) {

                var fullFilePath = path.resolve(expectedResultsFolder, sanitizeFilename(uniqueIdentifier) + '.txt');

                var readFilePromise = new Promise(function(resolve, reject) {
                    fs.readFile(fullFilePath, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });

                readFilePromise.then(function(actual) {
                    if(defaultMatchers.equals(expected.toString().replace(/(\r\n)|\n/g,''), actual.toString().replace(/(\r\n)|\n/g,''))){
                        return done();//{pass:true};
                    }
                    done.fail("Expected '" + expected.toString().replace(/(\r\n)|\n/g,'') + "' to Equal '" + actual.toString().replace(/(\r\n)|\n/g,'') + "'.");//('kaboing');
                }).catch(function(error) {
                    done.fail(error);
                });

                return{pass:true};
            },
            negativeCompare : function (expected, uniqueIdentifier, done){

                var fullFilePath = path.resolve(expectedResultsFolder, sanitizeFilename(uniqueIdentifier) + '.txt');

                var readFilePromise = new Promise(function(resolve, reject) {
                    fs.readFile(fullFilePath, function(err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });

                readFilePromise.then(function(actual) {
                    if(defaultMatchers.equals(expected.toString().replace(/(\r\n)|\n/g,''), actual.toString().replace(/(\r\n)|\n/g,''))){
                        done.fail("Expected '" + actual + "' to Equal '" + expected + "'.");//('kaboing');
                    }
                    return done();//{pass:true};
                }).catch(function(error) {
                    done.fail(error);
                });
                return{pass:true};
            }
        };
    }
};

beforeEach(function() {
    jasmine.addMatchers(matchers);
});
