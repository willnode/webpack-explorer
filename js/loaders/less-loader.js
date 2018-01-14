import { is, allFalsy, ofIndex } from '../toolkit';
import { parsestring } from '../template'
const css = require('./css-loader');

export default {
    name: 'less-loader',
    git: 'webpack-contrib/less-loader',
    slug: 'Less',
    options: {
        loader: { keys: css.default.options.loader.keys, value: 'style-loader' },
        sourceMap: false,
    },
    scheme: (op) => {
        var extract = op.loader.value === 'extract-text-webpack-plugin';
        var cssload = op.sourceMap ? { loader: 'css-loader', options: { sourceMap: true } } : 'css-loader';
        var lessload =  op.sourceMap ? { loader: 'less-loader', options: { sourceMap: true } } : 'less-loader';
        return {
            detail: css.loader_desc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

            depends: ['css-loader', 'less-loader', op.loader.value],

            head: is(extract, css.extract_head('ExtractLess')),

            plugin: is(extract, 'FUNC: ExtractLess'),
            test: /\.less$/,
            use: extract ? `FUNC: ExtractTextPlugin.extract([${parsestring(cssload)}, ${parsestring(lessload)}])` :
                [op.loader.value, cssload, lessload]
        }
    }
}
