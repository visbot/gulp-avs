const meta = require('../package.json');
const webvsc = require('../');

const assert = require('stream-assert');
const File = require('vinyl');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const should = require('should');

require('mocha');

const fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); }

describe(meta.name, function() {

  describe('webvsc()', function() {

    it('should emit error on streamed file', function (done) {
      gulp.src(fixtures('*'), { buffer: false })
        .pipe(webvsc())
        .once('error', function (err) {
          err.message.should.eql('Streaming not supported');
          done();
        });
    });
  });
});
