export default {
	name: 'handlebars-loader',
	git: 'pcardune/handlebars-loader',
	slug: 'Handlebars',
	ctg: 'HTML',
	options: {},
	scheme: () => {
		return {
			detail: 'resolved handlebars template',
			depends: ['handlebars-loader'],

			test: /\.handlebars$/,
			use: ['handlebars-loader']
		};
	}
};
