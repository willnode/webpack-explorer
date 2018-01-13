import { is, allFalsy, ofIndex } from '../toolkit';
import { parsestring } from '../template'
const css = require('./css-loader');

export default {
    name: 'sass-loader',
    slug: 'Sass/SCSS',
    options: {
        loader: { keys: css.default.options.loader.keys, value: 'style-loader' },
        sourceMap: false,
    },
    scheme: (op) => {
        var extract = op.loader.value === 'extract-text-webpack-plugin';
        var cssload = op.sourceMap ? { loader: 'css-loader', options: { sourceMap: true } } : 'css-loader';
        var sassload =  op.sourceMap ? { loader: 'sass-loader', options: { sourceMap: true } } : 'sass-loader';
        return {
            detail: css.loader_desc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

            depends: ['css-loader', 'sass-loader', 'node-sass']
                .concat(op.loader.value !== 'none' && op.loader.value),

            head: is(extract, css.extract_head('ExtractSass')),

            plugins: is(extract, 'FUNC: ExtractSass'),
            test: /\.sass$ /,
            use: extract ? `FUNC: ExtractTextPlugin.extract([${parsestring(cssload)}, ${parsestring(sassload)}])` :
                [(op.loader.value === 'none' ? 'style-loader' : 'tostring-loader'), cssload, sassload]
        }
    }
}
