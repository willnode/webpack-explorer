// Config for production 'yarn run prod'
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './js/main.js',
	output: {
		filename: 'bundle.js',
    // Weirdly this is okay.
		path: path.resolve(__dirname, 'docs')
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
						scss: ['vue-style-loader', 'css-loader', {
							loader: 'sass-loader', options: {outputStyle: 'compressed'
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
    /* Can't resist without this */
		new webpack.ProgressPlugin(),
    /* It's not production if not minified */
		new UglifyJsPlugin()
	]
};
