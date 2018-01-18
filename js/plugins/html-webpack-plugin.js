import { stringify } from '../toolkit';

export default {
	name: 'html-webpack-plugin',
	options: {
		template: '',
		filename: 'index.html'
	},
	scheme: op => {
		return {
			detail: `generate HTML with scripts and styles, to ${op.filename || 'index.html'}` +
				(op.template ? (' and be based on template at ' + op.template) : ''),

			depends: ['html-webpack-plugin'],

			head: 'const HtmlPlugin = require(\'html-webpack-plugin\')',
			plugin: `FUNC: new HtmlPlugin(${(() => {
				if (!op.template && (!op.filename || op.filename === 'index.html')) {
					return '';
				}

				return `{${[op.template && 'template:' + stringify(op.template),
					op.filename !== 'index.html' && 'filename:' + stringify(op.filename)
				].filter(Boolean).join()}}`;
			})()})`
		};
	}
};
