const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ProgressBar = require('progress-bar-webpack-plugin');

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
    //new UglifyJsPlugin({ parallel: true }),
    new ProgressBar()
  ],
  devtool: "cheap-module-eval-source-map",
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}