

export default {
    loaders: [
        require('./loaders/babel-loader'),
        require('./loaders/css-loader'),
        require('./loaders/sass-loader'),
        require('./loaders/ts-loader'),
        require('./loaders/vue-loader'),
        require('./loaders/file-loader'),
    ],
    plugins: [
        require('./plugins/uglifyjs-webpack-plugin')
    ],

    // dummy variables used during runtime
    selected: '', // selected loader type
    active: '', // selected loader scheme
    picked: '', // selected plugin type
    candidate: '', // selected plugin scheme
    yarn: false, // yarn or npm?
}