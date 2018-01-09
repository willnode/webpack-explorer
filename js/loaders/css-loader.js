module.exports = {
    desc: 'Load .css file',
    schemes: [
        {
            desc: 'by default',
            detail: 'require() a css file and deliver its content to javascript',
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            desc: 'with source map',
            detail: 'require() a css file and deliver its content to javascript with the source map',
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