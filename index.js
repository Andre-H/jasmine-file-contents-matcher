var Promise = require('promise');
var fs = require('fs');
var path = require('path');
const expectedResultsFolder = 'resources/expectedresults';
var unmatchedFileUtil = require('./unmatched-file-util.js');

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
                        unmatchedFileUtil.deleteDidNotMatchFile(fullFilePath);
                        return done();//{pass:true};
                    }
                    unmatchedFileUtil.writeDidNotMatchFile(fullFilePath, expected);
                    done.fail("Expected '" + expected.toString().replace(/(\r\n)/g,'\n') + "' to Equal '" + actual.toString().replace(/(\r\n)/g,'\n') + "'.");
                }).catch(function(error) {
                    unmatchedFileUtil.writeDidNotMatchFile(fullFilePath, expected);
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
                        done.fail("Expected '" + actual + "' NOT to Equal '" + expected + "'.");
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
                        unmatchedFileUtil.deleteDidNotMatchFile(fullFilePath);
                        return done();//{pass:true};
                    }
                    unmatchedFileUtil.writeDidNotMatchFile(fullFilePath, expected);
                    done.fail("Expected '" + expected.toString().replace(/(\r\n)/g,'\n') + "' to Contain '" + actual.toString().replace(/(\r\n)/g,'\n') + "'.");
                }).catch(function(error) {
                    unmatchedFileUtil.writeDidNotMatchFile(fullFilePath, expected);
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
                        done.fail("Expected '" + actual + "' NOT to Contain '" + expected + "'.");
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
                        unmatchedFileUtil.deleteDidNotMatchFile(fullFilePath);
                        return done();//{pass:true};
                    }
                    unmatchedFileUtil.writeDidNotMatchFile(fullFilePath, expected);

                    done.fail("Expected '" + expected.toString().replace(/(\r\n)|\n/g,'') + "' to Equal '" + actual.toString().replace(/(\r\n)|\n/g,'') + "'.");
                }).catch(function(error) {
                    unmatchedFileUtil.writeDidNotMatchFile(fullFilePath, expected);
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
                        done.fail("Expected '" + actual.toString().replace(/(\r\n)|\n/g,'') + "' NOT to Equal '" + expected.toString().replace(/(\r\n)|\n/g,'') + "'.");
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

module.exports = matchers;

beforeEach(function() {
    jasmine.addMatchers(matchers);
});
