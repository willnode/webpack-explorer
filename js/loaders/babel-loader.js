
// this babel have 2^3*5 = 40 variants! Keep the 'DRY'

var opts_depedency = {
    env: 'babel-preset-env',
    react: 'babel-preset-react',
    flow: 'babel-preset-flow',
    minify: 'babel-preset-minify',
}

var opts_detail = {
    env: ['all browser environments', 'latest 2 versions of major browsers', 'browser versions with more than 5% global usage', 'IE 9 and higher', ''],
    react: 'support React JSX',
    flow: 'support Flow',
    minify: 'minifies it',
}

var opts = {
    env: ['all', 'last 2 versions', '> 5%', 'not ie <= 8', 'off'],
    react: false,
    flow: false,
    minify: false,
};

module.exports = {
    desc: '.js',
    options: opts,
    schemes: (() => {
        var bools = [false, true];
        var schemes = [];
        var i_off = opts.env.indexOf('off');
        for (var i = 0; i < opts.env.length; i++)
            for (var b of bools)
                for (var c of bools)
                    for (var d of bools) {
                        schemes.push({
                            if: ['env', 'react', 'flow', 'minify'],
                            is: [opts.env[i], b, c, d],
                            detail: (() => 'Transpile javascript to ' + [ (i !== i_off ? 'compatible with ' : '') + opts_detail.env[i],
                                b && opts_detail.react, c && opts_detail.flow, d && opts_detail.minify].filter(Boolean).join(' and '))(),
                            depends: ['babel-core', i !== i_off && 'babel-preset-env', b && 'babel-preset-react', c && 'babel-preset-flow', d && 'babel-preset-minify'].filter(Boolean),

                            test: b ? /\.jsx?$/ : /\.js$/,
                            exclude: /node_modules/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    preset: [i === i_off ? '' : (i === 0 ? 'env' : ['env', { browser: opts.env[i] }]),
                                    b && 'react', c && 'flow', d && 'minify'].filter(Boolean)
                                }
                            }
                        })
                    }
        return schemes;
    })()
}