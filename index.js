'use strict';

// Meta
const meta = require('./package.json');

// Dependencies
const { basename, extname } = require('path')
const { convertFileSync } = require('@visbot/webvsc');
const PluginError = require('plugin-error');
const replaceExt = require('replace-ext');
const { statSync } = require('fs');
const through = require('through2');

const defaultOptions = {
    hidden: true,
    minify: true,
    verbose: 0
};

module.exports = function(options) {
    options = Object.assign(defaultOptions, options);

    return through.obj(function(file, encoding, callback) {
        if (file.isNull()) {
            this.push(file);
            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(meta.name, 'Streaming not supported'));
            return callback();
        }

        try {
            let preset = convertFileSync(file.path, options);
            file.contents = Buffer.from(preset);
        } catch (err) {
            this.emit('error', new PluginError(meta.name, err));
        }

        // always change file extension for output files
        file.path = replaceExt(file.path, '.webvs');

        this.push(file);
        callback();
    });
};
