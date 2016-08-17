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
                        deleteDidNotMatchFile(fullFilePath);
                        return done();//{pass:true};
                    }

                    writeDidNotMatchFile(fullFilePath, expected);
                    done.fail("Expected '" + expected.toString().replace(/(\r\n)/g,'\n') + "' to Equal '" + actual.toString().replace(/(\r\n)/g,'\n') + "'.");
                }).catch(function(error) {
                    writeDidNotMatchFile(fullFilePath, expected);
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
                        deleteDidNotMatchFile(fullFilePath);
                        return done();//{pass:true};
                    }

                    writeDidNotMatchFile(fullFilePath, expected);
                    done.fail("Expected '" + expected.toString().replace(/(\r\n)/g,'\n') + "' to Contain '" + actual.toString().replace(/(\r\n)/g,'\n') + "'.");

                }).catch(function(error) {

                    writeDidNotMatchFile(fullFilePath, expected);
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
                        deleteDidNotMatchFile(fullFilePath);
                        return done();//{pass:true};
                    }
                    writeDidNotMatchFile(fullFilePath, expected);

                    done.fail("Expected '" + expected.toString().replace(/(\r\n)|\n/g,'') + "' to Equal '" + actual.toString().replace(/(\r\n)|\n/g,'') + "'.");
                }).catch(function(error) {

                    writeDidNotMatchFile(fullFilePath, expected);

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

function deleteDidNotMatchFile(fullFilePath) {
    try{
        var failFilePath = fullFilePath.replace('.txt', '.didnotmatch.txt');
        fs.unlinkSync(failFilePath)
        return 0;
    }
    catch (e){
        if (!e.message.includes('ENOENT')) {
            console.log('Tried to remove an unused placeholder file: ' + failFilePath + ', but an error occured:' + e +
                '. This should not affect any test results.');
        }
        return e;
    }
}


function writeDidNotMatchFile(fullFilePath, expected) {
    try{
        var failFilePath = fullFilePath.replace('.txt', '.didnotmatch.txt');
        fs.writeFileSync(failFilePath, expected);
        console.log('A file was generated: ' + failFilePath);
        return 0;
    }
    catch (e){
        console.log('Tried to create a expected result file: ' + failFilePath + ', but an error occurred: ' + e);
        return e;
    }
}

module.exports = matchers;

beforeEach(function() {
    jasmine.addMatchers(matchers);
});
