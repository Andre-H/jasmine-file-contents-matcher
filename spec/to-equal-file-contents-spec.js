require('../index');

describe("Test custom matcher toContainFileContents", function() {

    it('should match when the file content is identical to the expected', function (done) {
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n' +
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .toEqualFileContents('a-menu-from-a-website', done);
    });

    it('should not match when file content is not identical to the expected', function (done) {
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n' +
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ-and then some more text')
            .not.toEqualFileContents('a-menu-from-a-website', done);
    });

});