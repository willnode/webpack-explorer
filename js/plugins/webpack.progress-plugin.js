export default {
	name: 'webpack.ProgressPlugin',
	options: {},
	scheme: () => {
		return {
			detail: 'Show progress when bundling is in progress',
			depends: ['webpack'],
			head: 'const webpack = require(\'webpack\')',
			plugin: `FUNC: new webpack.ProgressPlugin()`
		};
	}
};
