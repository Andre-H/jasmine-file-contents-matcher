var fs = require('fs');

exports.deleteDidNotMatchFile = function (fullFilePath){
    if(fullFilePath == null){
        return new Error("TypeError");
    }
    try{
        console.log('fullFilePath:'+fullFilePath);
        var failFilePath = fullFilePath.replace('.txt', '.didnotmatch.txt');

        console.log('failFilePath:'+failFilePath);
        console.log('fs:'+fs);
        console.log('fs.unlinkSync:'+fs.unlinkSync);

        fs.unlinkSync(failFilePath);
        return 0;
    }
    catch (e){
        console.log('e:'+e);
        console.log('e.message:'+ e.message);
        console.log('e.message.includes:'+e.message.includes);
        if (!e.message.includes('ENOENT')) {
            console.log('Tried to remove an unused placeholder file: ' + failFilePath + ', but an error occured:' + e +
                '. This should not affect any test results.');
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
        console.log('Tried to create a expected result file: ' + failFilePath + ', but an error occurred: ' + e);
        return e;
    }
};