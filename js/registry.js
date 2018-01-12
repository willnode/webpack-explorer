

export default {
    loaders: [
        require('./loaders/babel-loader').default,
        require('./loaders/coffee-loader').default,
        require('./loaders/css-loader').default,
        require('./loaders/eslint-loader').default,
        require('./loaders/file-loader').default,
        require('./loaders/handlebars-loader').default,
        require('./loaders/html-loader').default,
        require('./loaders/istanbul-loader').default,
        require('./loaders/jade-loader').default,
        require('./loaders/json-loader').default,
        require('./loaders/karma-loader').default,
        require('./loaders/less-loader').default,
        require('./loaders/markdown-loader').default,
        require('./loaders/mocha-loader').default,
        require('./loaders/modernizr-loader').default,
        require('./loaders/postcss-loader').default,
        require('./loaders/posthtml-loader').default,
        require('./loaders/pug-loader').default,
        require('./loaders/raw-loader').default,
        require('./loaders/react-hot-loader').default,
        require('./loaders/sass-loader').default,
        require('./loaders/stylus-loader').default,
        require('./loaders/typescript-loader').default,
        require('./loaders/underscore-loader').default,
        require('./loaders/url-loader').default,
        require('./loaders/vue-loader').default,
    ],
    plugins: [
        require('./plugins/extract-text-webpack-plugin').default,
        require('./plugins/html-webpack-plugin').default,
        require('./plugins/uglifyjs-webpack-plugin').default,
        require('./plugins/webpack.BannerPlugin').default,
        require('./plugins/webpack.DefinePlugin').default,
        require('./plugins/webpack.HotModuleReplacementPlugin').default,
        require('./plugins/webpack.IgnorePlugin').default,
        require('./plugins/webpack.ProgressPlugin').default,
        require('./plugins/webpack.ProvidePlugin').default,
    ],

    // dummy variables used during runtime
    selected: '', // selected loader type
    active: '', // selected loader scheme
    picked: '', // selected plugin type
    candidate: '', // selected plugin scheme
    yarn: false, // yarn or npm?
}