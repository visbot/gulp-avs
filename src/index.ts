import { convertPreset } from '@visbot/webvsc';
import { name as packageName } from '../package.json';
import { Transform, type TransformCallback } from 'node:stream';
import PluginError from 'plugin-error';
import type Vinyl from 'vinyl';

// TODO remove once typed by upstream
type WebvscOptions = {
	hidden?: boolean,
	minify?: boolean,
	noDate?: boolean;
	verbose?: number
};

function avs(userOptions: WebvscOptions): Transform {
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
				const webvsObject = convertPreset(file.contents as Buffer, file.stem, file.stat?.mtime, options);
				const webvsString = JSON.stringify(webvsObject);

				file.contents = Buffer.from(webvsString, 'utf-8');
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

const webvsc = (userOptions: WebvscOptions): Transform => {
	console.warn('webvsc() is deprecated and will be removed in the next major release. Use avs() instead.');

	return avs(userOptions);
};

export {
	avs,
	webvsc
}
