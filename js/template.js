import Data from './data'

var jsontojs = /[\"\'](\w+)[\"\']\:/g
var jsonescape = /([\'\\])/g


function parseloader(head, scheme) {
    if (scheme.head)
        if (Array.isArray(scheme.head))
            for (var hd of scheme.head)
                head.concat(scheme.head);
        else head.push(scheme.head);

    return `{ ${
        [
            parseparam('test', scheme.test),
            parseparam('exclude', scheme.exclude),
            parseparam('include', scheme.include),
            parseparam('use', scheme.use)
        ].filter(Boolean).join(', ')
        }, }`
}


function parseplugin(head, scheme) {
    if (scheme.head)
        if (Array.isArray(scheme.head))
            for (var hd of scheme.head)
                head.concat(scheme.head);
        else head.push(scheme.head);

    return [
        parsestring(scheme.plugin),
    ].filter(Boolean).join(', ')
}

export function parsestring(str) {
    if (str === undefined)
        return ''
    var type = typeof str;
    if (type === 'string') {
        if (str.substring(0, 6) === 'FUNC: ')
            return str.substring(6); // little hack
        else
            return `'${str.replace(jsonescape, '\\$1')}'`;
    }
    else if (str instanceof RegExp || type === 'boolean' || type === 'number')
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

function resolvepath(head = [], path = '', absolute) {
    if (Array.isArray(path)) {
        return path.map((v) => resolvepath(head, v, absolute));
    } else if (typeof path === 'object') {
        path = Object.assign({}, path);
        for (var i in path)
            path[i] = resolvepath(head, path[i], absolute);
        return path;
    }

    if (path.includes('/')) {
        if (absolute) {
            head.push(`const path = require('path')`)
            return `FUNC: path.resolve(__dirname, '${path}')`;
        } else {
            if (path.length > 1) {
                if (path.substr(0, 2) === '..') return path;
                else if (path.substr(0, 2) === './') return path;
                else if (path.charAt(0) === '/') return '.' + path;
                else return './' + path;
            }
        }
    } else
        return path;
}

function parseentry(head, entry = []) {
    if (entry.length === 0) return '{}';
    var usekeys = entry.every((v) => v.key);
    if (usekeys) {
        return `{${entry.map((v) => parseparam(v.key, resolvepath(head, v.value, false))).filter(Boolean).join(',')}}`;
    } else {
        if (entry.length === 1)
            return `'${entry[0].value.replace(jsonescape, '\\$1')}'`;
        else
            return `[${entry.map((v) => parsestring(resolvepath(head, v.value, false))).filter(Boolean).join(',')}]`
    }
}


export default function (data = new Data()) {

    var head = [];

    var ret = 'module.exports = {' +
        [
            'entry: ' + parseentry(head, data.entry),
            parseparam('output', {
                // rack up path individually
                filename: data.output.filename,
                path: resolvepath(head, data.output.path, true),
                publicPath: data.output.publicPath,
                library: data.output.library,
            }),
            (data.loaders && data.loaders.length > 0 && `module: { rules: [ ${
                data.loaders.map((v) => parseloader(head, v)).join(', ')} ] } `),
            (data.plugins && data.plugins.length > 0 && `plugins: [ ${
                data.plugins.map((v) => parseplugin(head, v)).join(', ')} ]`)
        ].filter(Boolean).join(', ')
        + '}';

    if (head.length > 0) {
        head = head.filter((v, i, a) => a.indexOf(v) === i);
        head.push('', '');
    }

    return head.join('\n') + ret;
}

