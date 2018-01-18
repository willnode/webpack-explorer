export default {
	name: 'svg-inline-loader',
	git: 'webpack-contrib/svg-inline-loader',
	slug: 'SVG',
	ctg: 'Asset',
	options: {},
	scheme: () => {
		return {
			detail: 'optimized HTML string of SVG',
			depends: ['svg-inline-loader'],

			test: /\.svg$/,
			use: ['svg-inline-loader']
		};
	}
};
