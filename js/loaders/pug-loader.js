import {is} from '../toolkit';

export default {
	name: 'pug-loader',
	git: 'pugjs/pug-loader',
	slug: 'Pug/Jade',
	ctg: 'HTML',
	options: {
		jade: false
	},
	scheme: op => {
		return {
			detail: 'template function from .pug' + is(op.jade, ' or .jade'),
			depends: ['pug-loader'],

			test: op.jade ? /\.(pug|jade)$/ : /\.pug$/,
			use: ['pug-loader']
		};
	}
};
