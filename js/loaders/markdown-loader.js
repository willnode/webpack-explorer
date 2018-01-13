export default {
    name: 'markdown-loader',
    options: {},
    scheme: (op) => {
        return {
            detail: 'converted HTML from markdown',
            depends: ['markdown-loader', 'html-loader'],

            test: /\.(md|markdown)$/,
            use: ['html-loader', 'markdown-loader']
        }
    }
}