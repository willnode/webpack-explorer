const filterIt = arr =>
	arr.filter(x => {
		if (!x.scheme(x.options).detail) {
			console.warn('ERR-INCOMPLETE:' + x.name);
			return false;
		}
		return true;
	});

const groupIt = arr => {
	const ctgs = ['Asset', 'HTML', 'CSS', 'JS'];
	const val = ctgs.map((x => {
		return {
			title: x, loaders: []
		};
	}));

	for (const l of arr) {
		const i = ctgs.indexOf(l.ctg);
		if (i >= 0) {
			val[i].loaders.push(l);
		}
	}

	return val;
};

const loaders = [
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
	require('./loaders/svg-inline-loader').default,
	require('./loaders/typescript-loader').default,
	require('./loaders/underscore-loader').default,
	require('./loaders/url-loader').default,
	require('./loaders/vue-loader').default
];

export default {
	loaders: filterIt(loaders),
	loaderGroups: groupIt(loaders),
	plugins: filterIt([
		require('./plugins/html-webpack-plugin').default,
		require('./plugins/uglifyjs-webpack-plugin').default,
		require('./plugins/webpack.banner-plugin').default,
		require('./plugins/webpack.define-plugin').default,
		require('./plugins/webpack.hot-module-replacement-plugin').default,
		require('./plugins/webpack.progress-plugin').default
	]),

	// Dummy variables used during runtime
	selected: '', // Selected loader type
	active: '', // Selected loader scheme
	picked: '', // Selected plugin type
	candidate: '', // Selected plugin scheme
	yarn: false // Yarn or npm?
};
