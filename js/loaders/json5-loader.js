export default {
    name: 'json5-loader',
    slug: 'JSON5',
    options: {},
    scheme: (op) => {
        return {
            detail: 'parsed object from JSON5',
            depends: ['json5-loader'],

            test: /\.json5$/,
            use: ['json5-loader']
        }
    }
}