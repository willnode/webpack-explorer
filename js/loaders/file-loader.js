import {is, csvToRegexp} from '../toolkit';

const names = ['[hash].[ext]', '[path][name].[ext]', '[name].[ext]'];

export default {
	name: 'file-loader',
	git: 'webpack-contrib/file-loader',
	slug: 'File Loader',
	ctg: 'Asset',
	options: {
		files: 'png, jpe?g, bmp, gif',
		name: {keys: names, value: '[hash].[ext]'},
		emitFile: true
	},
	scheme: op => {
		const customname = op.name.value !== '[hash].[ext]';
		return {
			detail: 'the public path of selected files' +
                is(customname, ' with custom format ', op.name.value) +
                is(!op.emitFile, ' without actually emitting files to output path'),

			depends: ['file-loader'],

			test: csvToRegexp(op.files),
			use: [(!customname & op.emitFile) ? 'file-loader' : {
				loader: 'file-loader',
				options: {
					name: customname ? op.name.value : undefined,
					emitFile: op.emitFile && undefined
				}
			}]
		};
	}
};
