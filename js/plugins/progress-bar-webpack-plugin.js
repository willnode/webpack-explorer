export default  {
    name: 'progress-bar-webpack-plugin',
    options: {},
    scheme: (op) => {
        return {
            detail: 'show rebuild progress during bundle',
            depends: ['progress-bar-webpack-plugin'],
            head: "const ProgressBarPlugin = require('progress-bar-webpack-plugin')",
            plugin: `FUNC: new ProgressBarPlugin()`
        }
    }
}