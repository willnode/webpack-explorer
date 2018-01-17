import {is, ofIndex} from '../toolkit';
import {parsestring} from '../template';

const css = require('./css-loader');

export default {
	name: 'stylus-loader',
	git: 'shama/stylus-loader',
	slug: 'Stylus',
	options: {
		loader: {keys: css.default.options.loader.keys, value: 'style-loader'},
		sourceMap: false
	},
	scheme: op => {
		const extract = op.loader.value === 'extract-text-webpack-plugin';
		const cssload = op.sourceMap ? {loader: 'css-loader', options: {sourceMap: true}} : 'css-loader';
		const stylload = op.sourceMap ? {loader: 'stylus-loader', options: {sourceMap: true}} : 'stylus-loader';
		return {
			detail: css.loaderDesc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

			depends: ['css-loader', 'stylus-loader', 'stylus', op.loader.value],

			head: is(extract, css.extractHead('ExtractStylus')),

			plugin: is(extract, 'FUNC: ExtractStylus'),
			test: /\.styl$/,
			use: extract ? `FUNC: ExtractStylus.extract([${parsestring(cssload)}, ${parsestring(stylload)}])` :
                [op.loader.value, cssload, stylload]
		};
	}
};
