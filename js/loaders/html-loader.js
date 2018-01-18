import {is} from '../toolkit';

export default {
	name: 'html-loader',
	git: 'webpack-contrib/html-loader',
	slug: 'HTML Loader',
	ctg: 'HTML',
	options: {
		minimize: false,
		solveSrc: true
	},
	scheme: op => {
		return {
			detail: is(op.minimize, 'minified ') + `HTML contents` +
                is(op.solveSrc, ` while processing extenal contents using loaders`),

			depends: ['html-loader'],

			test: /\.html$/,
			use: [(op.minimize | !op.solveSrc) ? {
				loader: 'html-loader',
				options: {
					minimize: op.minimize || undefined,
					attrs: op.solveSrc ? undefined : false
				}
			} : 'html-loader']
		};
	}
};
