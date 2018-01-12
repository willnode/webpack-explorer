export default {
    name: 'html-webpack-plugin',
    options: {
        template: '',
        filename: 'index.html'
    },
    scheme: (op) => {
        return {
            detail: `generate HTML with bundled scripts and styles to ${op.filename || 'index.html'}`
                + (op.template ? (' that based on template at ' + op.template) : ''),

            depends: ['html-webpack-plugin'],

            head: "const HtmlPlugin = require('html-webpack-plugin')",
            plugin: `FUNC: new HtmlPlugin(${(() => {
                if (!op.template && (!op.filename || op.filename === 'index.html')) return '';

                return `{${[op.template && 'template:' + op.template, op.filename && 'filename:' + op.filename
                ].filter(Boolean).join()}}`
            })()})`
        }
    }
}