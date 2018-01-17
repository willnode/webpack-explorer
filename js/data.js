
import {js_beautify as beautify} from 'js-beautify';
import Registry from './registry';
import {default as template, parseloader, parseplugin} from './template';

// https://github.com/sindresorhus/xo/issues/75
const beautifyOpts = JSON.parse('{"indent_size":2}');

// Load highlighter manually to keep the bundle small
const hljs = require('../node_modules/highlight.js/lib/highlight');
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));

const data = {
	loaders: [], // Modules as scheme located in our /modules/
	plugins: [], // Plugins as scheme located in our /plugins/
	options: [], // Advanced options as filename located in our /options/
	entry: [{key: '', value: 'main.js'}], // Entries (key, value)
	output: {
		path: '', // Out directory
		filename: 'bundle.js', // Out bundle
		publicPath: '', // Out html asset directory
		library: '' // Out as module name
	},
	registry: Registry,
	renderz: () => {
        // Renderz because vue will buggy if we name this 'render'
		const bs = beautify(template(data), beautifyOpts);
		return hljs.highlightAuto(bs).value;
	},
	renderLoader: () => {
		const bs = beautify(parseloader(undefined, undefined, data.registry.active), beautifyOpts);
		return hljs.highlightAuto(bs).value;
	},
	renderPlugin: () => {
		const bs = beautify(parseplugin(undefined, data.registry.candidate), beautifyOpts);
		return hljs.highlightAuto(bs).value;
	},
	chooseLoader: () => {
		const sel = data.registry.selected;
		data.registry.active = sel.scheme(sel.options);
	},
	choosePlugin: () => {
		const sel = data.registry.picked;
		data.registry.candidate = sel.scheme(sel.options);
	},
	depedencies: () => {
		const dev = ['webpack', 'webpack-dev-server'];
		let l;
		let ll;

		for (l of data.loaders) {
			if (l.depends) {
				for (ll of l.depends) {
					dev.push(ll);
				}
			}
		}

		for (l of data.plugins) {
			if (l.depends) {
				for (ll of l.depends) {
					dev.push(ll);
				}
			}
		}

		return dev.filter(Boolean).map(v => `<a href="https://www.npmjs.com/package/${v}">${v}</a>`).join(' ');
	}
};

export default data;
