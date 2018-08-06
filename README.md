# gulp-webvsc

[![npm](https://flat.badgen.net/npm/license/gulp-webvsc)](https://www.npmjs.org/package/gulp-webvsc)
[![npm](https://flat.badgen.net/npm/v/gulp-webvsc)](https://www.npmjs.org/package/gulp-webvsc)
[![CircleCI](https://flat.badgen.net/circleci/project/idleberg/gulp-webvsc)](https://circleci.com/gh/idleberg/gulp-webvsc)
[![David](https://flat.badgen.net/david/dep/idleberg/gulp-webvsc)](https://david-dm.org/idleberg/gulp-webvsc)
[![David](https://flat.badgen.net/david/dev/idleberg/gulp-webvsc)](https://david-dm.org/idleberg/gulp-webvsc?type=dev)

Gulp plugin to convert [Winamp AVS presets](https://www.wikiwand.com/en/Advanced_Visualization_Studio) into [Webvs](https://github.com/azeem/webvs) JSON.

## Installation

```sh
# npm
$ npm install --save-dev gulp-webvsc

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
