const meta = require('../package.json');
const webvsc = require('../');

const assert = require('stream-assert');
const File = require('vinyl');
const gulp = require('gulp');
const path = require('path');
const should = require('should');
const { readFileSync } = require('fs');

require('mocha');

const fixtures = (glob) => { return path.join(__dirname, 'fixtures', glob); }
const expected = (glob) => { return path.join(__dirname, 'expected', glob); }

const options = {
  minify: true,
  noDate: true
};

describe(meta.name, () => {
  describe('webvsc()', () => {
    it('should emit error on streamed file', done => {
      gulp.src(fixtures('*'), { buffer: false })
        .pipe(webvsc())
        .once('error', err => {
          err.message.should.eql('Streaming not supported');
          done();
        });
    });

    it('convert preset: comment.avs', done => {
      let file = 'comment';
      let webvsPreset = readFileSync(expected(`${file}.webvs`), 'utf-8');

      gulp.src(fixtures(`${file}.avs`))
        .pipe(webvsc(options))
        .pipe(assert.length(1))
        .pipe(assert.first( d => { d.contents.toString().should.eql(webvsPreset); }))
        .pipe(assert.end(done));
    });

    it('convert preset: empty.avs', done => {
      let file = 'empty';
      let webvsPreset = readFileSync(expected(`${file}.webvs`), 'utf-8');

      gulp.src(fixtures(`${file}.avs`))
        .pipe(webvsc(options))
        .pipe(assert.length(1))
        .pipe(assert.first( d => { d.contents.toString().should.eql(webvsPreset); }))
        .pipe(assert.end(done));
    });

    it('convert preset: invert.avs', done => {
      let file = 'invert';
      let webvsPreset = readFileSync(expected(`${file}.webvs`), 'utf-8');

      gulp.src(fixtures(`${file}.avs`))
        .pipe(webvsc(options))
        .pipe(assert.length(1))
        .pipe(assert.first( d => { d.contents.toString().should.eql(webvsPreset); }))
        .pipe(assert.end(done));
    });

    it('convert preset: superscope.avs', done => {
      let file = 'superscope';
      let webvsPreset = readFileSync(expected(`${file}.webvs`), 'utf-8');

      gulp.src(fixtures(`${file}.avs`))
        .pipe(webvsc(options))
        .pipe(assert.length(1))
        .pipe(assert.first( d => { d.contents.toString().should.eql(webvsPreset); }))
        .pipe(assert.end(done));
    });
  });
});
