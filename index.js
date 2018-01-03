'use strict';

// Meta
const meta = require('./package.json');

// Dependencies
const { basename, extname } = require('path')
const { convertPreset } = require('@visbot/webvsc');
const PluginError = require('plugin-error');
const replaceExt = require('replace-ext');
const { statSync } = require('fs')
const through = require('through2');

module.exports = function(options) {
    options = Object.assign({
        hidden: false,
        minify: false,
        verbose: 0
    }, options);

    return through.obj(function(file, encoding, callback) {

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(meta.name, 'Streaming not supported'));
            return callback();
        }

        let presetName = basename(file.path, extname(file.path));
        let presetDate = statSync(file.path).mtime.toISOString();
        let whitespace = (options.minify === true) ? '' : '  ';

        try {
            let preset = JSON.stringify(convertPreset(file.contents, presetName, presetDate, options), null, whitespace);
            file.contents = new Buffer(preset);
        } catch (err) {
            this.emit('error', new PluginError(meta.name, err));
        }

        // always change file extension for output files
        file.path = replaceExt(file.path, '.webvs');

        this.push(file);
        callback();
    });
};
