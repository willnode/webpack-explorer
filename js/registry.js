import {print} from 'util';

const filterIt = arr =>
    arr.filter((x, i, a) => {
	if (!x.scheme(x.options).detail) {
		console.warn('ERR-INCOMPLETE:' + x.name); return false;
	} return true;
});

export default {
	loaders: filterIt([
		require('./loaders/babel-loader').default,
		require('./loaders/coffee-loader').default,
		require('./loaders/cson-loader').default,
		require('./loaders/css-loader').default,
		require('./loaders/eslint-loader').default,
		require('./loaders/file-loader').default,
		require('./loaders/handlebars-loader').default,
		require('./loaders/html-loader').default,
		require('./loaders/json-loader').default,
		require('./loaders/json5-loader').default,
		require('./loaders/less-loader').default,
		require('./loaders/markdown-loader').default,
		require('./loaders/mocha-loader').default,
		require('./loaders/postcss-loader').default,
		require('./loaders/posthtml-loader').default,
		require('./loaders/pug-loader').default,
		require('./loaders/raw-loader').default,
		require('./loaders/sass-loader').default,
		require('./loaders/stylus-loader').default,
		require('./loaders/typescript-loader').default,
		require('./loaders/underscore-loader').default,
		require('./loaders/url-loader').default,
		require('./loaders/vue-loader').default
	]),
	plugins: filterIt([
		require('./plugins/html-webpack-plugin').default,
		require('./plugins/uglifyjs-webpack-plugin').default,
		require('./plugins/webpack.BannerPlugin').default,
		require('./plugins/webpack.DefinePlugin').default,
		require('./plugins/webpack.HotModuleReplacementPlugin').default,
		require('./plugins/webpack.IgnorePlugin').default,
		require('./plugins/webpack.ProgressPlugin').default,
		require('./plugins/webpack.ProvidePlugin').default
	]),

    // Dummy variables used during runtime
	selected: '', // Selected loader type
	active: '', // Selected loader scheme
	picked: '', // Selected plugin type
	candidate: '', // Selected plugin scheme
	yarn: false // Yarn or npm?
};
