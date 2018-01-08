module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js'
  },
  watch: true,
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  }
}