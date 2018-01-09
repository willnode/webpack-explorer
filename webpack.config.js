const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new UglifyJsPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devtool: "cheap-module-eval-source-map",
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}