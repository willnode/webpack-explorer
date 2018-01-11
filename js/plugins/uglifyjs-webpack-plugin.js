module.exports = {
    name: 'uglify-webpack-plugin',
    options: {
        cache: false,
        parallel: false,
        beautify: false,
        ie8: false
    },
    schemes: (() => {
        var bools = [false, true];
        var schemes = [];
        for (var a of bools)
            for (var b of bools)
                for (var c of bools)
                    for (var d of bools) {
                        schemes.push({
                            if: ['cache', 'parallel', 'beautify', 'ie8'],
                            is: [a, b, c, d],
                            detail: [(c ? 'Beautify' : 'Minifies') + ' the bundled javascript',
                            a && 'caching enabled', b && 'parallel process enabled', d && 'support to IE8'
                            ].filter(Boolean).join(' with '),

                            depends: ['uglify-webpack-plugin'],

                            // it's ugly to do
                            head: "var UglifyJsPlugin = require('uglify-webpack-plugin')",
                            plugin: `FUNC: new UglifyJSPlugin(${(() => {
                                if (!(a | b | c | d)) return '';

                                return `{${[a && 'cache:true', b && 'parallel:true', (c | d) &&
                                    (`uglifyOptions: {${[c && 'mangle:false,output:{beautify:true}', d
                                        && 'ie8:true'].filter(Boolean).join()}}`)].filter(Boolean).join()}}`
                            })()})`
                        })
                    }
        return schemes;
    })()
}