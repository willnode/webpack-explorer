
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

export function ofIndex(option) { return option.keys.indexOf(option.value); }