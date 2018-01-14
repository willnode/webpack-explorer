import { is, allFalsy, ofIndex } from '../toolkit';

export default {
    name: 'underscore-loader',
    git: 'tomek-f/underscore-loader',
    options: {
        engine: { keys: ['lodash.escape', 'lodash', 'underscore'], value: 'lodash.escape' },
        minify: true,
    },
    scheme: (op) => {
        return {
            detail: is(op.minify, 'minified ') + 'HTML from .tpl',
            depends: ['underscore-loader', op.engine],

            test: /\.tpl$/,
            use: [(op.engine !== 'lodash.escape' || !op.minify) ? {
                loader: 'underscore-loader',
                options: {
                    engine: `var _ = { require('${op.engine.value}') };`,
                    minify: op.minify ? undefined : false,
                }
            } : 'underscore-loader']
        }
    }
}