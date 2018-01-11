module.exports = {
    name: '.vue\t(vue-loader)',
    options: {
        useStyle: ['none', 'css', 'sass'],
    },
    schemes: [
        {
            if: 'useStyle',
            is: 'none',
            detail: 'Load and parse .vue template during bundle without <style>. Throw error if <style> tag is added',
            depends: ['vue-loader', 'vue-template-compiler'],

            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            if: 'useStyle',
            is: 'css',
            detail: 'Load and parse .vue template during bundle.',
            depends: ['vue-loader', 'vue-template-compiler', 'css-loader'],

            test: /\.vue$/,
            use: ['vue-loader']
        }, {
            if: 'useStyle',
            is: 'sass',
            detail: 'Load and parse .vue template during bundle. Use SASS in styles using <style lang="scss">',
            depends: ['vue-loader', 'vue-template-compiler', 'sass-loader', 'css-loader', 'vue-style-loader'],

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