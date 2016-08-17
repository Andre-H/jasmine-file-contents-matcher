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

    it('should fail matcher when file content does not contain expected', function (done){
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message.replace(/(\r\n)/g,'\n')).toEqual("Expected 'This is not whats in the file' to Contain 'Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\nControl Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ'.");
            done();
        });
        expect('This is not whats in the file').toContainFileContents('a-menu-from-a-website', done);
    });

    it('should fail negative matcher when file content is identical to the expected', function (done){
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message.replace(/(\r\n)/g,'\n')).toEqual("Expected 'Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\nControl Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ' NOT to Contain 'Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\nControl Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ'.");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n' +
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .not.toContainFileContents('a-menu-from-a-website', done);
    });

    it('should not match when no file corresponding to the identifier exists', function (done) {
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toMatch("Error: ENOENT(: no such file or directory)?, open '.+there-is-no-file-for-this-identifier\.txt'");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .toContainFileContents('there-is-no-file-for-this-identifier', done);
    });

    it('should fail negative compare when no file corresponding to the identifier exists', function (done) {
        spyOn(done, 'fail').and.callFake(function(message) {
            expect(message).toMatch("Error: ENOENT(: no such file or directory)?, open '.+there-is-no-file-for-this-identifier\.txt'");
            done();
        });
        expect('Configuration File Reference\nAPI\nStyle Guide\nSyntax vs JS Syntax\nSupport\nPlugins\nTimeouts\n'+
            'Control Flow\nHow It Works\nUpgrading to Jasmine 2.x\nMobile Setup\nFAQ')
            .not.toContainFileContents('there-is-no-file-for-this-identifier', done);
    });

});