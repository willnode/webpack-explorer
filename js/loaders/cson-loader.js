export default {
    name: 'cson-loader',
    git: 'awnist/cson-loader',
    slug: 'CSON',
    options: {},
    scheme: (op) => {
        return {
            detail: 'parsed object from CSON',
            warn: undefined,
            depends: ['cson-loader'],

            head: undefined,
            test: /\.cson$/,
            use: ['cson-loader']
        }
    }
}