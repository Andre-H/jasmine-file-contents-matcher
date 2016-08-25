# node-jasmine-file-contents-matcher
A Jasmine 2 custom matcher that compares a result against the contents of a file.

Build status: [![Run Status](https://api.shippable.com/projects/5784213e3be4f4faa56c79de/badge?branch=master)](https://app.shippable.com/projects/5784213e3be4f4faa56c79de)

Test coverage: [![Coverage Badge](https://api.shippable.com/projects/5784213e3be4f4faa56c79de/coverageBadge?branch=master)](https://app.shippable.com/projects/5784213e3be4f4faa56c79de)

## Installation
`npm install node-jasmine-file-contents-matcher`

## Usage
Place the following call before your tests in your suite
```
require('node-jasmine-file-contents-matcher');
```

Place your expected result files in a folder `resources/expectedresults`

Use your matchers according to the examples below
```javascript
it('should match when the file content is identical to the expected', function (done) {
    expect('a string').toEqualFileContents('file-name', done);
});

it('should match when the file content contains the expected', function (done) {
    expect('a string').toContainFileContents('file-name', done);
});

//You can use the .not modifier

it('should not match when file content is not identical to the expected', function(done) {
    expect('Not going to match').not.toEqualFileContents('file-name', done);
});

it('should not match when the file content doesn`t contain the expected', function (done) {
    expect('Not going to match').not.toContainFileContents('file-name', done);
});
```

The filenames must be whatever is passed as the first parameter in the matcher call plus the `'.txt'` extension.

In the example above, the expected result file should be: `resources/expectedresults/file-name.txt`.

###The following matchers are available

.toEqualFileContents

.toContainFileContents

.toEqualFileContentsIgnoreLineBreaks

.toContainFileContentsIgnoreLineBreaks


## Development
If you want to build and test this project you will be able to by:
```
npm install
npm test
```