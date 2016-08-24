var fs = require('fs');

exports.deleteDidNotMatchFile = function (fullFilePath){
    try{
        var failFilePath = fullFilePath.replace('.txt', '.didnotmatch.txt');
        fs.unlinkSync(failFilePath);
        return 0;
    }
    catch (e){
        if (e.message && e.message.indexOf('ENOENT') == -1) {
            console.log('Tried to remove an unused placeholder file: ' + failFilePath + ', but an unexpected error' +
                ' occured: ' + e + '. This should not affect any test results.');
        }
        return e;
    }
};

exports.writeDidNotMatchFile = function (fullFilePath, expected) {
    try {
        var failFilePath = fullFilePath.replace('.txt', '.didnotmatch.txt');
        fs.writeFileSync(failFilePath, expected);
        console.log('A file was generated: ' + failFilePath);
        return 0;
    }
    catch (e) {
        console.log('Tried to output the actual results to a placeholder file: ' + failFilePath + ', but an' +
            ' error occurred: ' + e);
        return e;
    }
};