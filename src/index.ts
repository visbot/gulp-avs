// @ts-ignore
import { convertFile } from '@visbot/webvsc';
import { name as packageName } from '../package.json';
import { Transform, type TransformCallback } from 'node:stream';
import PluginError from 'plugin-error';
import type Vinyl from 'vinyl';

// TODO remove once typed by upstream
type WebvscOptions = {
	hidden?: boolean,
	minify?: boolean,
	verbose?: number
};

export function webvsc(userOptions: WebvscOptions): Transform {
	return new Transform({
		objectMode: true,

		/**
		 * Transform function for the Gulp plugin.
		 * @param {Vinyl} file - The vinyl file being processed.
		 * @param {BufferEncoding} _encoding - The encoding of the file.
		 * @param {TransformCallback} callback - The callback function to signal the completion of the transformation.
		 */
		transform(file: Vinyl, _encoding: BufferEncoding, callback: TransformCallback) {
			if (file.isNull()) {
				callback(null, file);
				return;
			}

			if (file.isStream()) {
				callback(new PluginError(packageName, 'Streaming not supported'));
				return;
			}

			if (!file.contents) {
				callback(new PluginError(packageName, 'Empty file'));
				return;
			}

			const options: WebvscOptions = {
				hidden: true,
				minify: true,
				verbose: 0,
				...userOptions
			};

			const errorList: string[] = [];

			try {
				convertFile(file.contents, file.basename, file.stat?.mtime || new Date(), options)
			} catch (error) {
				this.emit('error', new PluginError(packageName, error as Error, {
					fileName: file.path
				}));
			}

			if (errorList && errorList.length > 0) {
				this.emit('error', new PluginError(packageName, `\n${errorList.join('\n')}`, {
					fileName: file.path,
					showStack: false
				}));
			}

			file.extname = '.webvs';

			callback(null, file);
		}
    });
}