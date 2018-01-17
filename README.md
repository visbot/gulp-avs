# gulp-webvsc

[![npm](https://img.shields.io/npm/l/gulp-webvsc.svg?style=flat-square)](https://www.npmjs.org/package/gulp-webvsc)
[![npm](https://img.shields.io/npm/v/gulp-webvsc.svg?style=flat-square)](https://www.npmjs.org/package/gulp-webvsc)
[![Travis](https://img.shields.io/travis/idleberg/gulp-webvsc.svg?style=flat-square)](https://travis-ci.org/idleberg/gulp-webvsc)
[![David](https://img.shields.io/david/idleberg/gulp-webvsc.svg?style=flat-square)](https://david-dm.org/idleberg/gulp-webvsc)
[![David](https://img.shields.io/david/dev/idleberg/gulp-webvsc.svg?style=flat-square)](https://david-dm.org/idleberg/gulp-webvsc?type=dev)

Gulp plugin to convert [Winamp AVS presets](https://www.wikiwand.com/en/Advanced_Visualization_Studio) into [Webvs](https://github.com/azeem/webvs) JSON.

## Installation

```sh
# npm
$ npm install gulp-webvsc

# Yarn
$ yarn add gulp-webvsc
```

## Usage

`webvsc([options])`

The output file-extension will automatically be set to `.webvs`, so there's no need to pipe in additional plugins.

**Example:**

Standard usage

```js
const gulp = require('gulp');
const webvsc = require('gulp-webvsc');

// Gulp v4
gulp.task('convert', (done) => {
  gulp.src('input/**/*.avs')
    .pipe(webvsc())
    .pipe(gulp.dest('output'));

  done();
});

// Gulp v3
gulp.task('convert', function() {
  return gulp.src('input/**/*.avs')
    .pipe(webvsc())
    .pipe(gulp.dest('output'));
});
```

**Example:**

Minify JSON and rename output files

```js
const gulp = require('gulp');
const rename = require('gulp-rename');
const webvsc = require('gulp-webvsc');

// Gulp v4
gulp.task('convert', (done) => {
  gulp.src('input/**/*.avs')
    .pipe(webvsc({ minify: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('output'));

  done();
});
```

## Options

### hidden

Type: `boolean`  
Default: `true`  

Don't extract hidden strings from fixed-size strings

### minify

Type: `boolean`  
Default: `false`  

Minify generated JSON

### verbose

Type: `number`  
Default: `0`  

Control the amount of output displayed:

* `0` Hide output
* `1` List detected components
* `2` List component details

## Related Projects

* [webvsc](https://github.com/grandchild/AVS-File-Decoder)
* [webvsc-cli](https://github.com/idleberg/webvsc-cli)
* [grunt-webvsc](https://github.com/idleberg/grunt-webvsc)

## License

This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/gulp-webvsc) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
