export default {
	name: 'webpack.HotModuleReplacementPlugin',
	options: {},
	scheme: () => {
		return {
			detail: 'Enable webpack hot-reloading',
			depends: ['webpack'],
			head: 'const webpack = require(\'webpack\')',
			plugin: `FUNC: new webpack.HotModuleReplacementPlugin()`
		};
	}
};
