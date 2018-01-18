import {is, ofIndex} from '../toolkit';
import {parsestring} from '../template';

const css = require('./css-loader');

export default {
	name: 'sass-loader',
	git: 'webpack-contrib/sass-loader',
	slug: 'Sass/SCSS',
	ctg: 'CSS',
	options: {
		loader: {keys: css.default.options.loader.keys, value: 'style-loader'},
		sourceMap: false,
		compressed: false
	},
	scheme: op => {
		const extract = op.loader.value === 'extract-text-webpack-plugin';
		const cssload = op.sourceMap ? {loader: 'css-loader', options: {sourceMap: true}} : 'css-loader';
		const sassload = (op.sourceMap | op.compressed) ? {
			loader: 'sass-loader', options: {
				sourceMap: op.sourceMap || undefined,
				outputStyle: op.compressed ? 'compressed' : undefined
			}
		} : 'sass-loader';

		return {
			detail: css.loaderDesc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

			depends: ['css-loader', 'sass-loader', 'node-sass', op.loader.value],

			head: is(extract, css.extractHead('ExtractSass')),

			plugin: is(extract, 'FUNC: ExtractSass'),
			test: /\.sass$/,
			use: extract ? `FUNC: ExtractSass.extract([${parsestring(cssload)}, ${parsestring(sassload)}])` :
                [op.loader.value, cssload, sassload]
		};
	}
};
