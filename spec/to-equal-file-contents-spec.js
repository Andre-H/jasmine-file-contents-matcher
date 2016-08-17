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

    it('should fail matcher when file content is not identical to the expected', function (done){
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message.replace(/(\r\n)/g,'\n')).toEqual("Expected 'This is not whats in the file' to Equal 'Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\nControl Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ'.");
            done();
        });
        expect('This is not whats in the file').toEqualFileContents('a-menu-from-a-website', done);
    });

    it('should fail negative matcher when file content is identical to the expected', function (done){
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message.replace(/(\r\n)/g,'\n')).toEqual("Expected 'Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\nControl Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ' NOT to Equal 'Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\nControl Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ'.");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n' +
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .not.toEqualFileContents('a-menu-from-a-website', done);
    });

    it('should not match when no file corresponding to the identifier exists', function (done) {
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toMatch("Error: ENOENT(: no such file or directory)?, open '.+there-is-no-file-for-this-identifier\.txt'");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .toEqualFileContents('there-is-no-file-for-this-identifier', done);
    });

    it('should fail negative compare when no file corresponding to the identifier exists', function (done) {
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toMatch("Error: ENOENT(: no such file or directory)?, open '.+there-is-no-file-for-this-identifier\.txt'");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .not.toEqualFileContents('there-is-no-file-for-this-identifier', done);
    });

});