import Data from './data'

var jsontojs = /[\"\'](\w+)[\"\']\:/g

export default function (data = new Data()) {

    function parseloader(scheme) {
        return `{ test: ${scheme.test}, use: ${parseloaderuse(scheme.use)}}`
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
        else if (typeof str === 'string')
            return `'${str}'`;
        else if (typeof str === 'RegExp')
            return `${str.toString()}`
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

    return 'module.exports = {' +
        [
            parseparam('entry', data.entry.length === 1 ? data.entry[0] : data.entry),
            parseparam('output', data.output),
            (data.loaders ? `modules: { rules: [ ${data.loaders.map((v) => parseloader(v)).join(', ')} ] } ` : '')
        ].filter(Boolean).join(', ')
        + '}';
}

