require('../index');

describe("Custom matcher toEqualFileContentsIgnoreLineBreaks", function() {

    it('should match when the file content is identical to the expected', function (done) {
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n' +
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .toEqualFileContentsIgnoreLineBreaks('a-menu-from-a-website', done);
    });

    it('should match when the file content is identical to the expected excluding line breaks', function (done) {
        expect('Configuration File ReferenceAPIStyle\n GuideSyntax \nvs JS\n Syntax\nSupp\nort\nPluginsTimeouts\n' +
            'Control Flow\nHow \nIt Works\nUpgrading to\n Jasmine 2.xMobile\n SetupFAQ')
            .toEqualFileContentsIgnoreLineBreaks('a-menu-from-a-website', done);
    });

    it('should not match when file content is not identical to the expected', function (done) {
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n' +
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ-and then some more text')
            .not.toEqualFileContentsIgnoreLineBreaks('a-menu-from-a-website', done);
    });

});
