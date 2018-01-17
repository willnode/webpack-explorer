
import Registry from './registry';
import {default as Template, parseloader, parseplugin} from './template';

const beautify = require('js-beautify').js_beautify;

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
		const bs = beautify(Template(data), {indent_size: 2});
		return hljs.highlightAuto(bs).value;
	},
	loader_renderz: () => {
		const bs = beautify(parseloader(undefined, undefined, data.registry.active), {indent_size: 2});
		return hljs.highlightAuto(bs).value;
	},
	plugin_renderz: () => {
		const bs = beautify(parseplugin(undefined, data.registry.candidate), {indent_size: 2});
		return hljs.highlightAuto(bs).value;
	},
	loader_choose: () => {
		const sel = data.registry.selected;
		data.registry.active = sel.scheme(sel.options);
	},
	plugin_choose: () => {
		const sel = data.registry.picked;
		data.registry.candidate = sel.scheme(sel.options);
	},
	depedencies: () => {
		const dev = ['webpack', 'webpack-dev-server'];

		for (var l of data.loaders) {
			if (l.depends) {
				for (var ll of l.depends) {
					dev.push(ll);
				}
			}
		}

		for (var l of data.plugins) {
			if (l.depends) {
				for (var ll of l.depends) {
					dev.push(ll);
				}
			}
		}

		return dev.filter(Boolean).map(v => `<a href="https://www.npmjs.com/package/${v}">${v}</a>`).join(' ');
	}
};

export default data;
