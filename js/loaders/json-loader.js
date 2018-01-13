export default {
    name: 'json-loader',
    slug: 'JSON',
    options: {},
    scheme: (op) => {
        return {
            detail: 'parsed object from JSON',
            warn: `JSON is already work out of box.`,
            depends: ['json-loader'],

            test: /\.json$/,
            use: ['json-loader']
        }
    }
}