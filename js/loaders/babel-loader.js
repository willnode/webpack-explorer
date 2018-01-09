module.exports = {
    desc: 'Transpile .js',
    schemes: [
        {
            desc: 'from latest ES specification',
            detail: 'Transpile javascript to compatible representation before getting bundled',
            depends: ['babel-loader', 'babel-core', 'babel-preset-env'],
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                /*options: {
                    presets: ['@babel/preset-env']
                }*/ // omitted because this is default behaviour
            }
        }, {
            desc: 'from React (Jsx)',
            detail: 'Transpile JSX to javascript before getting bundled',
            depends: ['babel-loader', 'babel-core', 'babel-preset-react'],
            test: /\.(jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        },
    ]
}