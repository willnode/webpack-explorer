export default  {
    name: 'webpack.ProgressPlugin',
    options: {},
    scheme: (op) => {
        return {
            detail: '',
            depends: ['webpack'],
            head: "const webpack = require('webpack')",
            plugin: `FUNC: new webpack.ProgressBar()`
        }
    }
}