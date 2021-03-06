export default {
	name: 'mocha-loader',
	git: 'webpack-contrib/mocha-loader',
	options: {},
	slug: 'Mocha',
	ctg: 'JS',
	scheme: () => {
		return {
			detail: 'the same javascript, while loaded with mocha tests',
			depends: ['mocha-loader', 'mocha'],

			exclude: /node_modules/,
			head: undefined,
			test: /test\.js$/,
			use: ['mocha-loader']
		};
	}
};
