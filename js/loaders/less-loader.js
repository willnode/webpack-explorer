import {is, ofIndex} from '../toolkit';
import {parsestring} from '../template';

const css = require('./css-loader');

export default {
	name: 'less-loader',
	git: 'webpack-contrib/less-loader',
	slug: 'Less',
	ctg: 'CSS',
	options: {
		loader: {keys: css.default.options.loader.keys, value: 'style-loader'},
		sourceMap: false
	},
	scheme: op => {
		const extract = op.loader.value === 'extract-text-webpack-plugin';
		const cssload = op.sourceMap ? {loader: 'css-loader', options: {sourceMap: true}} : 'css-loader';
		const lessload = op.sourceMap ? {loader: 'less-loader', options: {sourceMap: true}} : 'less-loader';
		return {
			detail: css.loaderDesc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

			depends: ['css-loader', 'less-loader', op.loader.value],

			head: is(extract, css.extractHead('ExtractLess')),

			plugin: is(extract, 'FUNC: ExtractLess'),
			test: /\.less$/,
			use: extract ? `FUNC: ExtractTextPlugin.extract([${parsestring(cssload)}, ${parsestring(lessload)}])` :
                [op.loader.value, cssload, lessload]
		};
	}
};
