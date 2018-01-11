export default {
    name: 'uglify-webpack-plugin',
    options: {
        cache: false,
        parallel: false,
        beautify: false,
        ie8: false
    },
    scheme: (op) => {
        return {
            detail: [(op.beautify ? 'beautify' : 'minify') + ' the bundled javascript',
            op.cache && 'caching enabled', op.parallel && 'parallel process enabled', op.ie8 && 'support to IE8'
            ].filter(Boolean).join(' with '),

            depends: ['uglify-webpack-plugin'],

            // it's ugly to do
            head: "const UglifyJsPlugin = require('uglify-webpack-plugin')",
            plugin: `FUNC: new UglifyJSPlugin(${(() => {
                if (!(op.cache | op.parallel | op.beautify | op.ie8)) return '';

                return `{${[op.cache && 'cache:true', op.parallel && 'parallel:true', (op.beautify | op.ie8) &&
                    (`uglifyOptions: {${[op.beautify && 'mangle:false,output:{beautify:true}', op.ie8
                        && 'ie8:true'].filter(Boolean).join()}}`)].filter(Boolean).join()}}`
            })()})`
        }
    }
}