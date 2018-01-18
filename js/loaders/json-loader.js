export default {
	name: 'json-loader',
	git: 'webpack-contrib/json-loader',
	slug: 'JSON',
	ctg: 'Asset',
	options: {},
	scheme: () => {
		return {
			detail: 'parsed object from JSON',
			warn: `JSON is already <a title="no need to setup this loader explicitly!" ` +
                `href="https://github.com/webpack-contrib/json-loader#install">works by default</a>.`,
			depends: ['json-loader'],

			test: /\.json$/,
			use: ['json-loader']
		};
	}
};
