// config for production 'yarn run prod'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    // weirdly this is okay.
    path: __dirname + '/docs'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        // need babel because of uglify? 🤔
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
              loader: 'sass-loader', options: {
/*spaghetti*/   outputStyle: 'compressed'
              }
            }]
          }
        }
      }]
    }]
  },
  plugins: [
    /* vue.js for production need this */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /* can't resist without this */
    new webpack.ProgressPlugin(),
    /* it's not production if not minified */
    new UglifyJsPlugin(),
  ]
}