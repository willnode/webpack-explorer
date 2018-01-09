import Data from './data'

var jsontojs = /[\"\'](\w)[\"\']\:/

export default function (data = new Data()) {

    function parseloader(scheme) {
        return `{ test: ${scheme.test}, use: ${parseloaderuse(scheme.use)}}`
    }

    function parseloaderuse(use) {
        if (typeof use === 'string')
            return use;
        else if (Array.isArray(use))
            return `[ ${use.map((v) => parseloaderuse(v)).join(', ')} ]`
        else if (typeof use === 'object')
            return JSON.stringify(use).replace(jsontojs, `$1:`);
        else
            return '';
    }

    function parsestring(str) {
        if (!str)
            return ''
        else if (typeof str === 'string')
            return `'${str}'`;
        else if (Array.isArray(str))
            return `[ ${str.join(', ')} ]`
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
            parseparam('entry', data.entry),
            parseparam('output', data.output),
            (data.modules ? `modules: ${parseparam('rules', data.loaders.map((v) => parseloader(parseloader(v))))} ` : '')
        ].filter(Boolean).join(', ')
        + '}';
}

