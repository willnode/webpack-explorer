export default  {
    name: 'exract-text-webpack-plugin',
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