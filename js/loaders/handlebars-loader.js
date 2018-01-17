export default {
	name: 'handlebars-loader',
	git: 'pcardune/handlebars-loader',
	slug: 'Handlebars',
	options: {},
	scheme: op => {
		return {
			detail: 'resolved handlebars template',
			depends: ['handlebars-loader'],

			test: /\.handlebars$/,
			use: ['handlebars-loader']
		};
	}
};
