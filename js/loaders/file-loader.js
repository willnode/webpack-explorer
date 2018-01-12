var files = ['images', 'audio and videos', 'document', 'data'];
var tests = [/\.(gif|jpe?g|png|svg)/, /\.(wav|mp3|mp4|mkv|webm)/,
    /\.(txt|md|pdf|rtf|docx)/, /\.(raw|zip|json|ya?ml|csv)/]
var names = ['[hash].[ext]', '[path][name].[ext]'];

export default {
    name: 'file-loader',
    options: {
        files: { keys: files, value: 'images' },
        name: { keys: names, value: '[hash].[ext]' },
        publicPath: '',
        emitFile: true,
    },
    scheme: (op) => {
        return {
            detail: 'return the public path of loaded ' + op.files.value + (op.name.value !== '[hash].[ext]' ? ' with custom format [path][name].[ext]' : '')
                + (!op.emitFile ? ' without actually emitting files to public path' : ''),

            depends: ['file-loader'],
            test: tests[op.files.keys.indexOf(op.files.value)],

            use: [op.emitFile ? 'file-loader' : {
                loader: 'file-loader',
                options: {
                    emitFile: false
                }
            }]
        }
    }
}