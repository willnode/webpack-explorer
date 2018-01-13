export default {
    name: 'html-loader',
    options: {
        minimize: false,
        solveSrc: true,
    },
    scheme: (op) => {
        return {
            detail: `minified HTML content while require()-ing external src contents`,
            warn: '',
            depends: ['html-loader'],

            test: /\.html$/,
            use: ['html-loader']
        }
    }
}