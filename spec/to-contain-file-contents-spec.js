require('../index');

describe("Custom matcher toContainFileContents", function() {

    it('should match when the file content is identical to the expected', function (done) {
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .toContainFileContents('a-menu-from-a-website', done);
    });

    it('should match when the file content contains the expected', function (done) {
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ-and then some more text')
            .toContainFileContents('a-menu-from-a-website', done);
    });

    it('should not match when file doesn`t contain expected string', function(done) {
        expect('Not going to match').not.toContainFileContents('a-menu-from-a-website', done);
    });

});