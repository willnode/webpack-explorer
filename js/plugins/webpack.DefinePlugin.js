export default {
	name: 'webpack.DefinePlugin',
	options: {},
	scheme: op => {
		return {
			detail: '',
			depends: ['webpack'],
			head: 'const webpack = require(\'webpack\')',
			plugin: `FUNC: new webpack.ProgressBar()`
		};
	}
};
