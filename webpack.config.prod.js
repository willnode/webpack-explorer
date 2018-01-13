// config for production
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
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
            scss: ['vue-style-loader', 'css-loader', 'sass-loader']
          }
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.ProgressPlugin(),
    new UglifyJsPlugin(),
  ]
}