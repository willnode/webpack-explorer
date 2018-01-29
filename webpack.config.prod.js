// Config for production 'yarn run prod'
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './js/main.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [{
        // Need babel because of uglify? 🤔
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			}]
		}, {
			test: /\.vue$/,
			use: [{
				loader: 'vue-loader', options: {
					loaders: {
						css: ['vue-style-loader', {
							loader: 'css-loader', options: {
								minimize: true
							}
						}]
					}
				}
			}]
		}]
	},
	plugins: [
    /* Vue.js for production need this */
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
    /* It's not production if not minified */
		new UglifyJsPlugin()
	]
};
