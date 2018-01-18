import { csvToRegexp } from '../toolkit';

function size(s) {
	if (s > 1024 * 1024)		{
		return `${(s / (1024 * 1024)).toFixed(2)} MB`;
	}	else if (s > 1024)		{
		return `${(s / 1024).toFixed(2)} KB`;
	}
	return `${s} bytes`;
}

export default {
	name: 'url-loader',
	git: 'webpack-contrib/url-loader',
	slug: 'URL Loader',
	ctg: 'Asset',
	options: {
		files: 'jpe?g, svg',
		limit: 0
	},
	scheme: op => {
		const limit = op.limit > 0;
		return {
			detail: 'embedded base64 url from selected files' +
				(limit ? ` if fewer than ${size(op.limit)}` : ''),
			warn: limit ? 'will fallback to file-loader if a file exceed that limit' : undefined,
			depends: limit ? ['file-loader', 'url-loader'] : ['url-loader'],

			test: csvToRegexp(op.files),
			use: [limit ? {
				loader: 'url-loader',
				options: {
					limit: Number(op.limit)
				}
			} : 'url-loader']
		};
	}
};
