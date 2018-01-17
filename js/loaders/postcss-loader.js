import {is, ofIndex} from '../toolkit';
import {parsestring} from '../template';

const css = require('./css-loader');

export default {
	name: 'postcss-loader',
	git: 'postcss/postcss-loader',
	slug: 'postcss',
	options: {
		loader: {keys: css.default.options.loader.keys, value: 'style-loader'}
	},
	scheme: op => {
		const extract = op.loader.value === 'extract-text-webpack-plugin';
		const cssload = op.sourceMap ? {loader: 'css-loader', options: {sourceMap: true}} : 'css-loader';
		const postload = op.sourceMap ? {loader: 'postcss-loader', options: {sourceMap: true}} : 'postcss-loader';
		return {
			detail: css.loaderDesc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

			depends: ['css-loader', 'postcss-loader', 'postcss', op.loader.value],

			head: is(extract, css.extractHead('ExtractPostCss')),

			plugin: is(extract, 'FUNC: ExtractPostCss'),
			test: /\.css$/,
			use: extract ? `FUNC: ExtractPostCss.extract([${parsestring(cssload)}, ${parsestring(postload)}])` :
                [op.loader.value, cssload, postload]
		};
	}
};
