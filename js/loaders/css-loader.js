import {parsestring} from '../template'

var loader_desc = ['as a script that inject <style> tag to Html DOM',
    'to outside bundle and return its public path', 'into javascript bundle as a module']

export default {
    name: 'css-loader',
    options: {
        loader: { keys: ['style-loader', 'extract-text-webpack-plugin', 'none'], value: 'style-loader' },
        sourceMap: false,
    },
    scheme: (op) => {
        var extract = op.loader.value === 'extract-text-webpack-plugin';
        var cssload = op.sourceMap ? {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
        } : 'css-loader';
        return {
            detail: 'put CSS content ' + loader_desc[op.loader.keys.indexOf(op.loader.value)] + (op.sourceMap ? ' and generate a source map' : ''),
            warn: extract ? 'must add extract-text-webpack-plugin as .css file explicitly' : undefined,
            depends: [op.loader.value !== 'none' && op.loader.value, 'css-loader'].filter(Boolean),

            head: extract ? ["const ExtractTextPlugin = require('extract-text-webpack-plugin')"] : undefined,
            test: /\.css$/,
            use: extract ? `FUNC: ExtractTextPlugin.extract([${parsestring(cssload)}])` :
            (op.loader.value === 'none' ? [cssload] : ['style-loader', cssload])
        }
    }
}