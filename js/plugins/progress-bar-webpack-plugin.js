module.exports = {
    name: 'progress-bar-webpack-plugin',
    options: {},
    schemes: (() => {
        var bools = [false, true];
        var schemes = [];
        for (var a of bools)
            for (var b of bools)
                for (var c of bools)
                    for (var d of bools) {
                        schemes.push({
                            detail: 'Show rebuild progress during bundle',
                            depends: ['progress-bar-webpack-plugin'],

                            // it's ugly to do
                            head: "const ProgressBarPlugin = require('progress-bar-webpack-plugin')",
                            plugin: `FUNC: new ProgressBarPlugin()`
                        })
                    }
        return schemes;
    })()
}