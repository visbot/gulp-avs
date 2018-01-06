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

    it('convert presets', function (done) {
      gulp.src(fixtures('*'))
        .pipe(webvsc({minify:true}))
        .pipe(assert.length(1))
        .pipe(assert.first(function (d) { d.contents.toString().should.eql('{"name":"superscope","date":"2018-01-06T12:23:18.387Z","clearFrame":true,"components":[{"type":"SuperScope","group":"Render","code":{"init":"n=800","perFrame":"t=t-0.05","onBeat":"","perPoint":"d=i+v*0.2; r=t+i*$PI*4; x=cos(r)*d; y=sin(r)*d"},"audioChannel":"Center","audioSource":"Waveform","colors":["#ffffff"],"lineType":"Dots"}]}'); }))
        .pipe(assert.end(done));
    });
  });
});
