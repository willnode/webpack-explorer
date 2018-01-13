export default {
    name: 'raw-loader',
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