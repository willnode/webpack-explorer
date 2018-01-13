import { is, allFalsy, ofIndex } from '../toolkit';

var opts_detail = {
    env: ['all browser environments', 'latest 2 versions of major browsers', 'browser versions with more than 5% global usage', 'IE 9 and higher', ''],
    react: 'support React JSX',
    flow: 'support Flow',
    minify: 'minified',
}

var opts = {
    env: { keys: ['all', 'last 2 versions', '> 5%', 'not ie <= 8', 'off'], value: 'all' },
    react: false,
    flow: false,
    minify: false,
};

export default {
    name: 'babel-loader',
    slug: 'Babel',
    options: opts,
    scheme: (op = opts) => {
        var i_on = op.env.value !== 'off';
        return {
            detail: 'compiled javascript that ' +
                is(i_on, 'compatible with ' + opts_detail.env[ofIndex(op.env)]) +
                is(op.react, opts_detail.react) +
                is(op.flow, opts_detail.flow) +
                is(op.minify, opts_detail.minify),

            depends: ['babel-core']
                .concat(i_on && ['babel-preset-env'])
                .concat(op.react && ['babel-preset-react'])
                .concat(op.flow && ['babel-preset-flow'])
                .concat(op.minify && 'babel-preset-minify'),

            test: op.react ? /\.jsx?$/ : /\.js$/,
            exclude: /node_modules/,

            use: {
                loader: 'babel-loader',
                options: {
                    preset: [is(i_on, (op.env.value === 'all' ?
                        'env' : ['env', { targets: { browsers: opts.env.value } }]))
                        , op.react && 'react', op.flow && 'flow', op.minify && 'minify'].filter(Boolean)
                }
            }
        }
    }
}