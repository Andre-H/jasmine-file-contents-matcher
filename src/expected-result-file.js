'use strict';
var fs = require('fs');
var path = require('path');
var expectedResultsFolder = '../resources/expectedresults/';
var Promise = require('promise');

function sanitizeFilename(name) {
    name = name.replace(/\s+/g, '-'); // Replace white space with dash
    return name.replace(/[^0-9a-zA-Z\-]/gi, ''); // Strip any special characters except the dash
}

function getExpectedResult(spec) {

    var fullFilePath = path.join(__dirname, expectedResultsFolder, sanitizeFilename(spec) + '.txt');

    var readFilePromise = function(file) {
        return new Promise(function(ok, notOk) {
            fs.readFile(file, function(err, data) {
                if (err) {
                    notOk(err)
                } else {
                    ok(data)
                }
            })
        })
    };

    return readFilePromise(fullFilePath).then(function(data) {
        //delete any spec.didnotmatch.txt files that may exist, but fails silently if it didn't exist
        fs.unlink(fullFilePath.replace('.txt','.didnotmatch.txt'), function (error){
            if(error) {
                if (!error.message.includes('no such file or directory')) {
                    console.log('Tried to remove an unused placeholder file but an error occured:' + error + '. This should not affect any test results.');
                }
            }
        });
        //normalize line breaks to \n
        return data.toString().replace(/(\r\n)/g,'\n');
    }, function (error){
        return 'Tried to read expected result from a file: ' + fullFilePath + ', but an error occurred: ' + error;
    });
}

function saveExpectedResult(spec, expected){
    var fullFilePath = path.join(__dirname, expectedResultsFolder, sanitizeFilename(spec) + '.didnotmatch.txt');
    fs.writeFile(fullFilePath, expected, function (error){
        if(error){
            console.log('Tried to create a expected result file: ' + fullFilePath + ', but an error occurred: ' + error);
        }else{
            console.log('A file was generated: ' + fullFilePath);
        }
    });
}

module.exports = {
    getExpectedResult: getExpectedResult,
    saveExpectedResult : saveExpectedResult
};