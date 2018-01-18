// Config for development: 'yarn run bundle' and 'yarn run run' 🏍
const webpack = require('webpack');

module.exports = {
	entry: './js/main.js',
	output: {
		// This does nothing if we are using webpack-dev-server as
		// dev-server save the bundle in memory. (which is great)
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.vue$/,
			use: [{
				loader: 'vue-loader', options: {
					loaders: {
						/* I put scss inside app.vue */
						scss: ['vue-style-loader', 'css-loader', 'sass-loader']
					}
				}
			}]
		}]
	},
	plugins: [
		new webpack.ProgressPlugin()
	],
	resolve: {
		extensions: ['.js', '.vue']
	},
	devtool: 'cheap-source-map' /* "cheap-module-eval-source-map" <- webpack buggy here? */
};
