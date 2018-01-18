export default {
	name: 'webpack.HotModuleReplacementPlugin',
	options: {},
	scheme: () => {
		return {
			detail: 'Enable webpack hot-reloading',
			warn: 'With webpack-dev-server this plugin is no longer relevant',
			depends: ['webpack'],
			head: 'const webpack = require(\'webpack\')',
			plugin: `FUNC: new webpack.HotModuleReplacementPlugin()`
		};
	}
};
