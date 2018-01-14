
export function is(really, value) {
    if (really) return value;
    else if (typeof value === 'string') return '';
    else if (Array.isArray(value)) return [];
    else return undefined;
}

export function allFalsy(opts) {
    for (var prop in opts)
        if (opts[prop])
            return false;
    return true;
}

export function ofIndex(option) {
    return option.keys.indexOf(option.value);
}

export function simplifyIf(really, options) {
    return really ? options.loader : options;
}

export function csvToRegexp(csv) {
    return new RegExp(`\\.(${csv.replace(/ /g, '').replace(/,/g, '|')})$`);
}

var jsonescape = /['\\]/g

export function stringify(str) {
    return `'${str.replace(jsonescape, '\\$1')}'`
}