module.exports = {
    desc: 'Load .scss file',
    schemes: [
        {
            desc: 'by default',
            depends: ['sass-loader', 'css-loader', 'style-loader'],
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            desc: 'with source maps',
            depends: ['sass-loader', 'css-loader', 'style-loader'],
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        }
    ]
}