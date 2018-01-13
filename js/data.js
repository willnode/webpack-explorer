
import Data from './data';
import Registry from './registry';
import { default as Template, parseloader} from './template';

var beautify = require('js-beautify').js_beautify;

// load highlighter manually to keep the bundle small
var hljs = require('../node_modules/highlight.js/lib/highlight');
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));

var data = {
    loaders: [], // modules as scheme located in our /modules/
    plugins: [], // plugins as scheme located in our /plugins/
    options: [], // advanced options as filename located in our /options/
    entry: [{ key: '', value: 'main.js' }], // entries (key, value)
    output: {
        path: '', // out directory
        filename: 'bundle.js', // out bundle
        publicPath: '', // out html asset directory
        library: '' // out as module name
    },
    registry: Registry,
    renderz: () => {
        var bs = beautify(Template(data), { indent_size: 2 });
        return hljs.highlightAuto(bs).value;
    },
    loader_renderz: () => {
        var bs = beautify(parseloader([], data.registry.active), { indent_size: 2 });
        return hljs.highlightAuto(bs).value;
    },
    loader_choose: () => {
        var sel = data.registry.selected;
        data.registry.active = sel.scheme(sel.options);
    },
    plugin_choose: () => {
        var sel = data.registry.picked;
        data.registry.candidate = sel.scheme(sel.options);
    },
    depedencies: () => {
        var dev = ['webpack'];

        for (var l of data.loaders)
            if (l.depends)
                for (var ll of l.depends)
                    dev.push(ll)

        for (var l of data.plugins)
            if (l.depends)
                for (var ll of l.depends)
                    dev.push(ll)

        return dev.filter(Boolean).map((v) => `<a href="https://www.npmjs.com/package/${v}">${v}</a>`).join(' ');
    }
}

export default data;