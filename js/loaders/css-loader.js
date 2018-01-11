module.exports = {
    name: '.css\t(css-loader)',
    options: {
        sourceMap: false,
    },
    schemes: [
        {
            if: 'sourceMap',
            is: false,
            detail: 'require() a css file and deliver its content to javascript',
            depends: ['style-loader', 'css-loader'],

            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            if: 'sourceMap',
            is: true,
            detail: 'require() a css file and deliver its content to javascript with the source map',
            depends: ['style-loader', 'css-loader'],

            test: /\.css$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }]
        }
    ]
}