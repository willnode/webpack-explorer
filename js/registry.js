

export default {
    loaders: [
        require('./loaders/babel-loader').default,
        require('./loaders/css-loader').default,
        require('./loaders/sass-loader').default,
        require('./loaders/ts-loader').default,
        require('./loaders/vue-loader').default,
        require('./loaders/file-loader').default,
    ],
    plugins: [
        require('./plugins/uglifyjs-webpack-plugin').default,
        require('./plugins/progress-bar-webpack-plugin').default
    ],

    // dummy variables used during runtime
    selected: '', // selected loader type
    active: '', // selected loader scheme
    picked: '', // selected plugin type
    candidate: '', // selected plugin scheme
    yarn: false, // yarn or npm?
}