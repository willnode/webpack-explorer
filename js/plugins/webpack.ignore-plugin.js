export default {
	name: 'webpack.IgnorePlugin',
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
