
import Data from './data';
import Registry from './registry';
import Template from './template';

var beautify = require('js-beautify').js_beautify;

// load highlighter manually to keep the bundle small
var hljs = require('../node_modules/highlight.js/lib/highlight');
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));

var data = {
    loaders: [], // modules as scheme located in our /modules/
    plugins: [], // plugins as scheme located in our /plugins/
    options: [], // advanced options as filename located in our /options/
    entry: ['main.js'], // entries
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
    loader_filter: () => {
        var html = '';
        for (var prop in data.registry.selected.options) {
            var val = data.registry.selected.options[prop];
            var id = '__' + prop;
            var name = '___' + prop;
            if (window[name] === undefined) {
                window[name] = Array.isArray(val) ? val[0] : val;
            }

            // we're using runtime-only vue so do this legitimely.
            if (typeof val === 'boolean')
                html += `<div><span>${prop}</span><input id='${id}' name='loader-filter' type="checkbox" ` +
                    `onchange="${name}=document.getElementById('${id}').checked;update()" ${window[name] && 'checked'}></div>`
            else if (Array.isArray(val))
                html += `<div><span>${prop}</span><select id='${id}' onchange="${name}=document.getElementById('${id}').value;update()">` +
                    val.map((v) => `<option ${window[name] === v && 'selected'}>${v}</option>`).join('') + '</select></div>'
        }
        window.update();
        return html;
    },
    loader_choose: () => {
        var sel = data.registry.selected;
        for (var scheme of sel.schemes) {
            if (typeof scheme.if === 'string') {
                if (window['___' + scheme.if] === scheme.is) {
                    if (data.registry.active !== scheme)
                        data.registry.active = scheme;
                    break;
                }
            } else if (Array.isArray(scheme.if)) {
                if (scheme.if.every((v, i) => window['___' + v] === scheme.is[i])) {
                    if (data.registry.active !== scheme)
                        data.registry.active = scheme;
                    break;
                }
            }
        }
        return data.registry.active.detail;
    },
    depedencies: () => {
        var dev = ['webpack'];

        for (var l of data.loaders)
            if (l.depends)
                for (var ll of l.depends)
                    dev.push(ll)

        return dev.filter(Boolean).map((v) => `<a href="https://www.npmjs.com/package/${v}">${v}</a>`).join(' ');
    }
}

export default data;