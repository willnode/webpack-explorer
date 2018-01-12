const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBar = require('progress-bar-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [{
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
   new webpack.ProgressPlugin()
    //new UglifyJsPlugin({ parallel: true }),
   // new ProgressBar()
  ],
  devtool: "cheap-source-map" /*"cheap-module-eval-source-map" <- webpack goes buggy*/,
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}