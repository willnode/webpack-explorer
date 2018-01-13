export default {
    name: 'uglify-webpack-plugin',
    options: {
        parallel: false,
        beautify: false,
        sourceMap: true,
    },
    scheme: (op) => {
        return {
            detail: [(op.beautify ? 'beautify' : 'minify') + ' the bundled javascript',
            op.parallel && 'parallel process enabled', op.sourceMap && 'with source maps enabled'
            ].filter(Boolean).join(' with '),

            depends: ['uglify-webpack-plugin'],

            // it's ugly to do
            head: "const UglifyJsPlugin = require('uglify-webpack-plugin')",
            plugin: `FUNC: new UglifyJSPlugin(${(() => {
                if (!(op.beautify | op.parallel | op.sourceMap)) return '';

                return `{${[op.sourceMap && 'sourceMap:true', op.parallel && 'parallel:true', op.beautify &&
                    (`uglifyOptions: {mangle:false,output:{beautify:true} }}`)].filter(Boolean).join()}}`
            })()})`
        }
    }
}