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
const webvs = {
  'comment': '{"name":"comment","date":"2000-03-03T00:00:00.000Z","clearFrame":true,"components":[{"type":"Comment","group":"Misc","text":""}]}',
  'empty': '{"name":"empty","date":"2000-03-03T00:00:00.000Z","clearFrame":false,"components":[]}',
  'invert': '{"name":"invert","date":"2000-03-03T00:00:00.000Z","clearFrame":true,"components":[{"type":"Invert","group":"Trans","enabled":true}]}',
  'superscope': '{"name":"superscope","date":"2000-03-03T00:00:00.000Z","clearFrame":true,"components":[{"type":"SuperScope","group":"Render","code":{"init":"n=800","perFrame":"t=t-0.05","onBeat":"","perPoint":"d=i+v*0.2; r=t+i*$PI*4; x=cos(r)*d; y=sin(r)*d"},"audioChannel":"Center","audioSource":"Waveform","colors":["#ffffff"],"lineType":"Dots"}]}'
}

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

    it('convert preset: empty.avs', function (done) {
      gulp.src(fixtures('empty.avs'))
        .pipe(webvsc(
          {
            minify:true,
            noDate: true
          }
        ))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) { d.contents.toString().should.eql(webvs.empty); }))
        .pipe(assert.end(done));
    });

    it('convert preset: comment.avs', function (done) {
      gulp.src(fixtures('comment.avs'))
        .pipe(webvsc(
          {
            minify:true,
            noDate: true
          }
        ))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) { d.contents.toString().should.eql(webvs.comment); }))
        .pipe(assert.end(done));
    });

    it('convert preset: invert.avs', function (done) {
      gulp.src(fixtures('invert.avs'))
        .pipe(webvsc(
          {
            minify:true,
            noDate: true
          }
        ))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) { d.contents.toString().should.eql(webvs.invert); }))
        .pipe(assert.end(done));
    });

    it('convert preset: superscope.avs', function (done) {
      gulp.src(fixtures('superscope.avs'))
        .pipe(webvsc(
          {
            minify:true,
            noDate: true
          }
        ))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) { d.contents.toString().should.eql(webvs.superscope); }))
        .pipe(assert.end(done));
    });
  });
});
