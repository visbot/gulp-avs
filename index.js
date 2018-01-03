'use strict';

// Meta
const meta = require('./package.json');

// Dependencies
const { basename, extname } = require('path')
const { convertPreset } = require('@visbot/webvsc');
const PluginError = require('plugin-error');
const replaceExt = require('replace-ext');
const through = require('through2');

module.exports = function(options) {
    options = Object.assign({
        minify: false
    }, options);

    return through.obj(function(file, encoding, callback) {
        let baseName = basename(file.path, extname(file.path));

        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(meta.name, 'Streaming not supported'));
            return callback();
        }

        let whitespace = (options.minify === true) ? '' : '  ';

        try {
            let preset = JSON.stringify(convertPreset(file.contents, baseName), null, whitespace);
            file.contents = new Buffer(preset);
            file.path = replaceExt(file.path, '.webvs');
        } catch (err) {
            this.emit('error', new PluginError(meta.name, err));
        }

        this.push(file);
        callback();
    });
};
