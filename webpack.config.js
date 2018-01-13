// config for development: 'yarn run bundle' and 'yarn run run' 🏍
const webpack = require('webpack')

module.exports = {
  entry: './js/main.js',
  output: {
    // bundle.js as root path for development. sorry it's git ignored.
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
  devtool: "cheap-source-map" /* "cheap-module-eval-source-map" <- webpack buggy here? */,
  watch: true, /* not using webpack-dev-server. sorry */
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}