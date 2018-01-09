module.exports = {
    desc: 'Load .vue file',
    schemes: [
        {
            desc: 'by default',
            depends: ['vue-loader'],

            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            desc: 'with sass loader',
            depends: ['sass-loader', 'css-loader', 'style-loader'],
            test: /\.vue$/,
            use: [{
                loader: "vue-loader",
                options: {
                    loaders: {
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        sass: [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }]
        }
    ]
}