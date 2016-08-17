var unmatchedFileUtil = require('../unmatched-file-util.js');

describe('Unmatched files utils', function () {

    it('should throw an error when it cant create files', function () {
        expect(unmatchedFileUtil.writeDidNotMatchFile('')).toMatch('Error: ENOENT.*');
    });

    it('should throw an error when it cant erase files', function () {
        expect(unmatchedFileUtil.deleteDidNotMatchFile(null)).toMatch('TypeError.*');
    });
});