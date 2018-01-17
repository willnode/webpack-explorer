export default {
	name: 'webpack.ProvidePlugin',
	options: {},
	scheme: () => {
		return {
			detail: '',
			depends: ['webpack'],
			head: 'const webpack = require(\'webpack\')',
			plugin: `FUNC: new webpack.ProgressBar()`
		};
	}
};
