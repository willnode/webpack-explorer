module.exports = {
    name: '.scss\t(sass-loader)',
    options: {
        sourceMap: false,
    },
    schemes: [
        {
            if: 'sourceMap',
            is: false,
            detail: 'Load .scss file as ?',
            depends: ['sass-loader', 'css-loader', 'style-loader', 'node-sass'],

            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            if: 'sourceMap',
            is: true,
            detail: 'Load .scss file as ?. With source map',
            depends: ['sass-loader', 'css-loader', 'style-loader', 'node-sass'],
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