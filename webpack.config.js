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
      use: ['vue-loader']
    }]
  },
  plugins: [
    new UglifyJsPlugin(),
    new ProgressBar()
  ],
  devtool: "cheap-module-eval-source-map",
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}