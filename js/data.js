
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
                    `onchange="${name}=document.getElementById('${id}').checked;updateloader()" ${window[name] && 'checked'}></div>`
            else if (Array.isArray(val))
                html += `<div><span>${prop}</span><select id='${id}' onchange="${name}=document.getElementById('${id}').value;updateloader()">` +
                    val.map((v) => `<option ${window[name] === v && 'selected'}>${v}</option>`).join('') + '</select></div>'
        }
        window.updateloader();
        return html;
    },
    loader_choose: () => {
        var apply = (scheme) => { if (data.registry.active !== scheme) data.registry.active = scheme; }
        var sel = data.registry.selected;
        for (var scheme of sel.schemes) {
            if (!scheme.if) {
                apply(scheme);
                break;
            } else if (typeof scheme.if === 'string') {
                if (window['___' + scheme.if] === scheme.is) {
                    apply(scheme);
                    break;
                }
            } else if (Array.isArray(scheme.if)) {
                if (scheme.if.every((v, i) => window['___' + v] === scheme.is[i])) {
                    apply(scheme);
                    break;
                }
            }
        }
        return data.registry.active.detail;
    },
    plugin_filter: () => {
        var html = '';
        for (var prop in data.registry.picked.options) {
            var val = data.registry.picked.options[prop];
            var id = '__' + prop;
            var name = '___' + prop;
            if (window[name] === undefined) {
                window[name] = Array.isArray(val) ? val[0] : val;
            }

            // we're using runtime-only vue so do this legitimely.
            if (typeof val === 'boolean')
                html += `<div><span>${prop}</span><input id='${id}' name='plugin-filter' type="checkbox" ` +
                    `onchange="${name}=document.getElementById('${id}').checked;updateplugin()" ${window[name] && 'checked'}></div>`
            else if (Array.isArray(val))
                html += `<div><span>${prop}</span><select id='${id}' onchange="${name}=document.getElementById('${id}').value;updateplugin()">` +
                    val.map((v) => `<option ${window[name] === v && 'selected'}>${v}</option>`).join('') + '</select></div>'
        }
        window.updateplugin();
        return html;
    },
    plugin_choose: () => {
        var apply = (scheme) => { if (data.registry.candidate !== scheme) data.registry.candidate = scheme; }
        var sel = data.registry.picked;
        for (var scheme of sel.schemes) {
            if (!scheme.if) {
                apply(scheme);
                break;
            } else if (typeof scheme.if === 'string') {
                if (window['___' + scheme.if] === scheme.is) {
                    apply(scheme);
                    break;
                }
            } else if (Array.isArray(scheme.if)) {
                if (scheme.if.every((v, i) => window['___' + v] === scheme.is[i])) {
                    apply(scheme);
                    break;
                }
            }
        }
        return data.registry.candidate.detail;
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