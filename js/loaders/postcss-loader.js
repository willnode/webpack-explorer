import { is, allFalsy, ofIndex } from '../toolkit';
import { parsestring } from '../template'
const css = require('./css-loader');

export default {
    name: 'postcss-loader',
    git: 'postcss/postcss-loader',
    slug: 'postcss',
    options: {
        loader: { keys: css.default.options.loader.keys, value: 'style-loader' },
    },
    scheme: (op) => {
        var extract = op.loader.value === 'extract-text-webpack-plugin';
        var cssload = op.sourceMap ? { loader: 'css-loader', options: { sourceMap: true } } : 'css-loader';
        var postload =  op.sourceMap ? { loader: 'postcss-loader', options: { sourceMap: true } } : 'postcss-loader';
        return {
            detail: css.loader_desc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

            depends: ['css-loader', 'postcss-loader', 'postcss', op.loader.value],

            head: is(extract, css.extract_head('ExtractPostCss')),

            plugin: is(extract, 'FUNC: ExtractPostCss'),
            test: /\.css$/,
            use: extract ? `FUNC: ExtractPostCss.extract([${parsestring(cssload)}, ${parsestring(postload)}])` :
                [op.loader.value, cssload, postload]
        }
    }
}
