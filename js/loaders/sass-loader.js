export default  {
    name: 'sass-loader',
    options: {
        sourceMap: false,
    },
    scheme: (op) => {
        return {
            detail: 'require() a scss file and deliver its css content to javascript' + (op.sourceMap ? '  with the source map' : ''),
            depends: ['sass-loader', 'css-loader', 'style-loader', 'node-sass'],

            test: /\.scss$/,
            use: ['style-loader', op.sourceMap ? {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            } : 'css-loader', op.sourceMap ? {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            } : 'sass-loader']
        }
    }
}