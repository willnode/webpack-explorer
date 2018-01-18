import {is} from '../toolkit';

export default {
	name: 'eslint-loader',
	git: 'MoOx/eslint-loader',
	slug: 'ESLint',
	ctg: 'JS',
	options: {
		autofix: false
	},
	scheme: op => {
		return {
			detail: `the same javascript object, after being style-linted ${
                is(op.autofix, 'and fixed ')}by ESLint`,

			depends: ['eslint', 'eslint-loader'],

			enforce: 'pre',
			test: /\.js$/,
			use: [op.autofix ? {loader: 'eslint-loader', options: {fix: true}} : 'eslint-loader']
		};
	}
};
