import {jsonescape} from '../template';

export default {
	name: 'webpack.BannerPlugin',
	options: {
		message: ''
	},
	scheme: op => {
		return {
			detail: 'Write comment in bundle head',
			depends: ['webpack'],
			head: 'const webpack = require(\'webpack\')',
			plugin: `FUNC: new webpack.ProgressBar('${op.message.replace(jsonescape, '\\$1')}')`
		};
	}
};
