
// this babel have 2^3*5 = 40 variants! Keep the 'DRY'

var opts_detail = {
    env: ['all browser environments', 'latest 2 versions of major browsers', 'browser versions with more than 5% global usage', 'IE 9 and higher', ''],
    react: 'support React JSX',
    flow: 'support Flow',
    minify: 'minifies it',
}

var opts = {
    env: { keys: ['all', 'last 2 versions', '> 5%', 'not ie <= 8', 'off'], value:'all' },
    react: false,
    flow: false,
    minify: false,
};

export default {
    name: 'babel-loader',
    options: opts,
    scheme: (op = opts) => {
        var i_off = op.env.value === 'off';
        return {
            detail: (() => 'transpile javascript to be ' + [(i_off ? '' : 'compatible with ') + opts_detail.env[op.env.keys.indexOf(op.env.value)]
                , op.react && opts_detail.react, op.flow && opts_detail.flow
                , op.minify && opts_detail.minify].filter(Boolean).join(' and '))(),

            depends: ['babel-core', !i_off && 'babel-preset-env', op.react && 'babel-preset-react',
                op.react && 'react', op.react && 'react-dom', op.flow && 'babel-preset-flow',
                op.minify && 'babel-preset-minify'].filter(Boolean),

            test: op.react ? /\.jsx?$/ : /\.js$/,
            exclude: /node_modules/,

            use: {
                loader: 'babel-loader',
                options: {
                    preset: [i_off ? '' : (op.env.value === 'all' ? 'env' : ['env', { targets: { browsers: opts.env.value } }]),
                    op.react && 'react', op.flow && 'flow', op.minify && 'minify'].filter(Boolean)
                }
            }
        }
    }
}