var files = ['images', 'audio and videos', 'document', 'data'];
var tests = [/\.(gif|jpe?g|png|svg)/, /\.(wav|mp3|mp4|mkv|webm)/,
    /\.(txt|md|pdf|rtf|docx)/, /\.(raw|zip|json|ya?ml|csv)/]

export default {
    name: 'url-loader',
    options: {
        files: { keys: files, value: 'images' },
        limit: 0,
    },
    scheme: (op) => {
        var limit = op.limit > 0;
        return {
            detail: 'return the base64 url of loaded ' + op.files.value
                + (limit ? ` if fewer than ${op.limit} KB` : ''),
            warn: limit ? 'will fallback to file-loader if a file exceed that limit' : undefined,
            depends: limit ? ['file-loader', 'url-loader'] : ['url-loader'],

            test: tests[files.indexOf(op.files.value)],
            use: [!limit ? 'url-loader' : {
                loader: 'url-loader',
                options: {
                    limit: Number(op.limit)
                }
            }]
        }
    }
}