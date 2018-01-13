import { csvToRegexp } from '../toolkit';

export default {
    name: 'url-loader',
    options: {
        files: 'jpe?g, svg',
        limit: 0,
    },
    scheme: (op) => {
        var limit = op.limit > 0;
        return {
            detail: 'embedded base64 url from selected files'
                + (limit ? ` if fewer than ${op.limit} KB` : ''),
            warn: limit ? 'will fallback to file-loader if a file exceed that limit' : undefined,
            depends: limit ? ['file-loader', 'url-loader'] : ['url-loader'],

            test: csvToRegexp(op.files),
            use: [!limit ? 'url-loader' : {
                loader: 'url-loader',
                options: {
                    limit: Number(op.limit)
                }
            }]
        }
    }
}