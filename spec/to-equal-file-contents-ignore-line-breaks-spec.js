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

    it('should fail matcher when file content is not identical to the expected', function (done){
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toEqual("Expected 'This is not whats in the file' to Equal 'Configuration File ReferenceAPIStyle GuideSyntax vs JS SyntaxSupportPluginsTimeoutsControl FlowHow It WorksUpgrading to Jasmine 2.xMobile SetupFAQ'.");
            done();
        });
        expect('This is not whats in the file').toEqualFileContentsIgnoreLineBreaks('a-menu-from-a-website', done);
    });

    it('should fail negative matcher when file content is identical to the expected', function (done){
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toEqual("Expected 'Configuration File ReferenceAPIStyle GuideSyntax vs JS SyntaxSupportPluginsTimeoutsControl FlowHow It WorksUpgrading to Jasmine 2.xMobile SetupFAQ' NOT to Equal 'Configuration File ReferenceAPIStyle GuideSyntax vs JS SyntaxSupportPluginsTimeoutsControl FlowHow It WorksUpgrading to Jasmine 2.xMobile SetupFAQ'.");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n' +
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .not.toEqualFileContentsIgnoreLineBreaks('a-menu-from-a-website', done);
    });

    it('should not match when no file corresponding to the identifier exists', function (done) {
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toMatch("Error: ENOENT(: no such file or directory)?, open '.+there-is-no-file-for-this-identifier\.txt'");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .toEqualFileContentsIgnoreLineBreaks('there-is-no-file-for-this-identifier', done);
    });

    it('should fail negative compare when no file corresponding to the identifier exists', function (done) {
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toMatch("Error: ENOENT(: no such file or directory)?, open '.+there-is-no-file-for-this-identifier\.txt'");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .not.toEqualFileContentsIgnoreLineBreaks('there-is-no-file-for-this-identifier', done);
    });

});
