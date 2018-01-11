module.exports = {
    name: '.vue\t(vue-loader)',
    options: {
        sass: false,
    },
    schemes: [
        {
            if: 'sass',
            is: false,
            detail: 'Load and parse .vue template during bundle.',
            depends: ['vue-loader', 'vue-template-compiler', 'css-loader'],

            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            if: 'sass',
            is: true,
            detail: 'Load and parse .vue template during bundle. Use Sass/SCSS in styles using <style lang="scss">',
            depends: ['vue-loader', 'vue-template-compiler', 'sass-loader', 'node-sass', 'css-loader', 'vue-style-loader'],

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