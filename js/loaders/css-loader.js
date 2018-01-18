import {is, ofIndex} from '../toolkit';
import {parsestring} from '../template';

export const loaderDesc = [
	'none, but executes a javascript that inject <style> tags to HTML DOM',
	'public path to extracted CSS content (outside bundle)',
	'raw CSS content as string'
];

export const extractHead = name => [
	'const ExtractTextPlugin = require(\'extract-text-webpack-plugin\')',
	`const ${name} = new ExtractTextPlugin('[name][contenthash].css')`
];

export default {
	name: 'css-loader',
	git: 'webpack-contrib/css-loader',
	slug: 'CSS Loader',
	ctg: 'CSS',
	options: {
		loader: {keys: ['style-loader', 'extract-text-webpack-plugin', 'to-string-loader'], value: 'style-loader'},
		sourceMap: false
	},
	scheme: op => {
		const extract = op.loader.value === 'extract-text-webpack-plugin';
		const cssload = op.sourceMap ? {
			loader: 'css-loader',
			options: {sourceMap: true}
		} : 'css-loader';

		return {
			detail: loaderDesc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

			depends: ['css-loader', op.loader.value],

			head: is(extract, extractHead('ExtractCss')),
			plugin: is(extract, 'FUNC: ExtractCss'),
			test: /\.css$/,
			use: extract ? `FUNC: ExtractCss.extract([${parsestring(cssload)}])` :
                [op.loader.value, cssload]
		};
	}
};
