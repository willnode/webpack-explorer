export default {
    desc: 'Transpile .js file',
    schemes: [
        {
            desc: 'from latest env preset',
            test: '/\\.js$/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            desc: 'from react (jsx) preset',
            test: '/\\.(js|jsx)$/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
    ]
}