import {is} from '../toolkit';

export default {
	name: 'eslint-loader',
	git: 'MoOx/eslint-loader',
	options: {
		autofix: false
	},
	scheme: op => {
		return {
			detail: `the same javascript object, after being checked ${
                is(op.autofix, 'and fixed ')}by ESLint`,

			depends: ['eslint', 'eslint-loader'],

			enforce: 'pre',
			test: /\.js$/,
			use: [op.autofix ? {loader: 'eslint-loader', options: {fix: true}} : 'eslint-loader']
		};
	}
};
