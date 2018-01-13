import { csvToRegexp } from '../toolkit';

export default {
    name: 'raw-loader',
    options: {
        files: 'txt'
    },
    scheme: (op) => {
        return {
            detail: 'raw string from selected files',
            depends: ['raw-loader'],

            test: csvToRegexp(op.files),
            use: ['raw-loader']
        }
    }
}