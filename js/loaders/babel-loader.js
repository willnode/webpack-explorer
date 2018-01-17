import {is, ofIndex} from '../toolkit';

const optsDetail = {
	env: ['all browser environments', 'latest 2 versions of major browsers', 'browser versions with more than 5% global usage', 'IE 9 and higher', ''],
	react: 'support React JSX',
	flow: 'support Flow',
	minify: 'minified'
};

const opts = {
	env: {keys: ['all', 'last 2 versions', '> 5%', 'not ie <= 8', 'off'], value: 'all'},
	react: false,
	flow: false,
	minify: false
};

export default {
	name: 'babel-loader',
	git: 'babel/babel-loader',
	slug: 'Babel',
	options: opts,
	scheme: (op = opts) => {
		const useEnv = op.env.value !== 'off';
		return {
			detail: 'compiled javascript that ' + [
				is(useEnv, 'compatible with ' + optsDetail.env[ofIndex(op.env)]),
				is(op.react, optsDetail.react),
				is(op.flow, optsDetail.flow),
				is(op.minify, optsDetail.minify)
			].filter(Boolean).join(' and '),

			depends: ['babel-core', 'babel-loader']
                .concat(useEnv && ['babel-preset-env'])
                .concat(op.react && ['babel-preset-react'])
                .concat(op.flow && ['babel-preset-flow'])
                .concat(op.minify && 'babel-preset-minify'),

			test: op.react ? /\.jsx?$/ : /\.js$/,
			exclude: /node_modules/,

			use: {
				loader: 'babel-loader',
				options: {
					preset: [is(useEnv, (op.env.value === 'all' ?
                        'env' : ['env', {targets: {browsers: opts.env.value}}])),
						op.react && 'react', op.flow && 'flow', op.minify && 'minify'].filter(Boolean)
				}
			}
		};
	}
};
