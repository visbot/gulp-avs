# @visbot/gulp-avs

[![License](https://img.shields.io/github/license/visbot/gulp-avs?style=for-the-badge&color=blue)](https://github.com/visbot/gulp-avs/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@visbot/gulp-avs?style=for-the-badge)](https://www.npmjs.org/package/@visbot/gulp-avs)
[![Build](https://img.shields.io/github/actions/workflow/status/visbot/gulp-avs/tests.yml?style=for-the-badge)](https://github.com/visbot/gulp-avs/actions)

Gulp plugin to convert [Winamp AVS presets](https://www.wikiwand.com/en/Advanced_Visualization_Studio) into [Webvs](https://github.com/azeem/webvs) JSON.

## Installation

```sh
$ npm install --save-dev @visbot/gulp-avs
```

## Usage

`avs(options)`

The output file-extension will automatically be set to `.webvs`, so there's no need for additional plugins.

**Example:**

Standard usage

```js
// Gulpfile.mjs
import gulp from 'gulp';
import { avs } from '@visbot/gulp-avs';

gulp.task('convert', done => {
	gulp.src('input/**/*.avs')
		.pipe(avs())
		.pipe(gulp.dest('output'));

	done();
});
```

:warning: This plugin is now pure ESM. [Read how to migrate your `Gulpfile`](https://gist.github.com/noraj/007a943dc781dc8dd3198a29205bae04).

## Options

### hidden

Type: `boolean`  
Default: `true`  

Don't extract hidden strings from fixed-size strings

### minify

Type: `boolean`  
Default: `false`  

Minify generated JSON

### noDate

Type: `boolean`  
Default: `false`  

Does not add `date` property to generated JSON

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

## License

This work is licensed under [The MIT License](LICENSE)
