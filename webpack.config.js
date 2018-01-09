const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    //new UglifyJsPlugin()
  ],
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}