export default {
    name: 'markdown-loader',
    options: {},
    scheme: (op) => {
        return {
            detail: '',
            warn: '',
            depends: [''],

            head: undefined,
            test: /\.css$/,
            use: ['']
        }
    }
}