var rewire = require('rewire');
var index = rewire('../index.js');
var writeDidNotMatchFile = index.__get__('writeDidNotMatchFile');
var deleteDidNotMatchFile = index.__get__('deleteDidNotMatchFile');

describe('Unexported functions', function () {

    it('should throw an error when it cant create files', function () {
        expect(writeDidNotMatchFile('')).toMatch('Error: ENOENT.*');
    });

    it('should throw an error when it cant erase files', function () {
        expect(deleteDidNotMatchFile(null)).toMatch('TypeError.*');
    });
});