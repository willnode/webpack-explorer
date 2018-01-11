import Data from './data'

var jsontojs = /[\"\'](\w+)[\"\']\:/g
var jsonescape = /([\'\\])/g

export default function (data = new Data()) {

    function parseloader(scheme) {
        return `{ ${
            [
                parseparam('test', scheme.test),
                parseparam('exclude', scheme.exclude),
                parseparam('include', scheme.include),
            ].filter(Boolean).join(', ')
            }, use: ${parseloaderuse(scheme.use)}}`
    }

    function parseloaderuse(use) {
        if (typeof use === 'string')
            return use;
        else
            return JSON.stringify(use).replace(jsontojs, `$1:`);
    }

    function parsestring(str) {
        if (!str)
            return ''
        else if (typeof str === 'string') {
            if (str.substring(0, 6) === 'FUNC: ')
                return str.substring(6); // little hack
            else
                return `'${str.replace(jsonescape, '\\$1')}'`;
        }
        else if (str instanceof RegExp)
            return str.toString()
        else if (Array.isArray(str))
            return `[ ${str.map((s) => parsestring(s)).filter(Boolean).join(', ')} ]`
        else {
            var s = [];
            for (var prop in str) {
                s.push(parseparam(prop, str[prop]))
            }
            return `{ ${s.filter(Boolean).join(', ')} }`
        }
    }

    function parseparam(name, value) {
        if (!value) return ''
        else return name + ": " + parsestring(value)
    }

    function resolvepath(head = [], path = '') {
        if (Array.isArray(path)) {
            return path.map((v) => resolvepath(head, v));
        } else if (typeof path === 'object') {
            path = Object.assign({}, path);
            for(var i in path)
                path[i] = resolvepath(head, path[i]);
            return path;
        }

        if (path.includes('/')) {
            head.push(`import path from 'path';`)
            return `FUNC: path.resolve(__dirname, '${path}')`;
        } else
            return path;
    }

    var head = [];

    var ret = 'module.exports = {' +
        [
            parseparam('entry', resolvepath(head, data.entry.length === 1 ? data.entry[0] : data.entry)),
            parseparam('output', {
                // rack up path individually
                filename: resolvepath(head, data.output.filename),
                path: resolvepath(head, data.output.path),
                publicPath: data.output.publicPath,
                library: data.output.library,
            }),
            (data.loaders && data.loaders.length > 0 ? `module: { rules: [ ${
                data.loaders.map((v) => parseloader(v)).join(', ')} ] } ` : '')
        ].filter(Boolean).join(', ')
        + '}';

    if (head.length > 0) {
        head = head.filter((v, i, a) => a.indexOf(v) === i);
        head.push('', '');
    }

    return head.join('\n') + ret;
}

