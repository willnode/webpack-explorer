

export default {
    loaders: [
        require('./loaders/babel-loader'),
        require('./loaders/css-loader'),
        require('./loaders/sass-loader'),
        require('./loaders/ts-loader'),
        require('./loaders/vue-loader'),
        require('./loaders/file-loader'),
    ],

    // dummy variables used during runtime
    selected: '',
    active: '',
    yarn: false,
}