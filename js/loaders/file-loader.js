import { is, allFalsy, ofIndex, csvToRegexp } from '../toolkit';
var names = ['[hash].[ext]', '[path][name].[ext]'];

export default {
    name: 'file-loader',
    options: {
        files: 'png, jpe?g, bmp, gif',
        name: { keys: names, value: '[hash].[ext]' },
        emitFile: true,
    },
    scheme: (op) => {
        var customname = op.name.value !== '[hash].[ext]';
        return {
            detail: 'the public path of selected files'+
                is(customname, ' with custom format ', op.name.value) +
                is(!op.emitFile, ' without actually emitting files to public path'),

            depends: ['file-loader'],

            test: csvToRegexp(op.files),
            use: [(!customname & op.emitFile) ? 'file-loader' : {
                loader: 'file-loader',
                options: {
                    name: customname ? op.name.value : undefined,
                    emitFile: op.emitFile && undefined
                }
            }]
        }
    }
}