import { is, allFalsy, ofIndex } from '../toolkit';
import { parsestring } from '../template'

export const loader_desc = [
    'none, but execute a script that inject <style> tags to HTML DOM',
    'public path to extracted CSS content (outside bundle)',
    'raw CSS content as string'
]

export const extract_head = (name) => [
    "const ExtractTextPlugin = require('extract-text-webpack-plugin')",
    `const ${name} = new ExtractTextPlugin('[name][contenthash].css')`
]

export default {
    name: 'css-loader',
    slug: 'CSS',
    options: {
        loader: { keys: ['style-loader', 'extract-text-webpack-plugin', 'to-string-loader'], value: 'style-loader' },
        sourceMap: false,
    },
    scheme: (op) => {
        var extract = op.loader.value === 'extract-text-webpack-plugin';
        var cssload = op.sourceMap ? {
            loader: 'css-loader',
            options: { sourceMap: true }
        } : 'css-loader';

        return {
            detail: loader_desc[ofIndex(op.loader)] +
                is(op.sourceMap, ' with the source map'),

            depends: ['css-loader', op.loader.value],

            head: is(extract, extract_head('ExtractCss')),
            plugin: is(extract, 'FUNC: ExtractCss'),
            test: /\.css$/,
            use: extract ? `FUNC: ExtractCss.extract([${parsestring(cssload)}])` :
                [op.loader.value, cssload]
        }
    }
}