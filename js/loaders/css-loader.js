import { is, allFalsy, ofIndex } from '../toolkit';
import { parsestring } from '../template'

export const loader_desc = [
    'none, but execute a script that inject <style> tags to Html DOM',
    'public path to extracted css content (outside bundle)',
    'CSS content as tring'
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


            depends: ['css-loader']
                .concat(op.loader.value !== 'none' && op.loader.value),

            head: is(extract, extract_head('ExtractCss')),
            plugins: is(extract, 'FUNC: ExtractCss'),
            test: /\.css$/,
            use: extract ? `FUNC: ExtractTextPlugin.extract([${parsestring(cssload)}])` :
                [(op.loader.value === 'none' ? 'style-loader' : 'tostring-loader'), cssload]
        }
    }
}