import { is, allFalsy } from '../toolkit';

export default {
    name: 'coffee-loader',
    git: 'webpack-contrib/coffee-loader',
    slug: 'CoffeeScript',
    options: {
        literate: false,
        sourceMap: false,
        transpile: false
    },
    scheme: (op) => {
        return {
            detail: `compiled javascript of ${
                is(op.literate, 'literated ')} .coffee script${
                is(op.sourceMap, ' with source maps')}${
                is(op.transpile, ' that can run in old browsers')}`,

            depends: ['coffee-loader'].concat(op.transpile && ['babel-core', 'babel-preset-env']),

            test: op.literate ? /\.coffee.md$/ : /\.coffee$/,
            use: [allFalsy(op) ? 'coffee-loader' : {
                loader: 'coffee-loader',
                options: {
                    literate: op.literate || undefined,
                    sourceMap: op.sourceMap || undefined,
                    transpile: op.transpile ? { presets: ['env'] } : undefined,
                }
            }]
        }
    }
}