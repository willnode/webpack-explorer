export default {
	name: 'posthtml-loader',
	git: 'posthtml/posthtml-loader',
	slug: 'PostHTML',
	ctg: 'HTML',
	options: {},
	scheme: () => {
		return {
			detail: 'post processed HTML file using PostHTML',
			depends: ['posthtml-loader', 'posthtml-plugin'],

			test: /\.html$/,
			use: [{
				loader: 'posthtml-loader',
				options: {
					ident: 'posthtml',
					parser: 'PostHTML Parser',
					plugins: [
						`FUNC: require('posthtml-plugin')(options)`
					]
				}
			}]
		};
	}
};
