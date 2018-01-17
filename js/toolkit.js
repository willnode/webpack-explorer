
export function is(really, value) {
	if (really) {
		return value;
	}	else if (typeof value === 'string') {
		return '';
	}	else if (Array.isArray(value)) {
		return [];
	}
	return undefined;
}

export function allFalsy(opts) {
	for (const prop in opts) {
		if (opts[prop]) {
			return false;
		}
	}
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

const jsonescape = /['\\]/g;

export function stringify(str) {
	return `'${str.replace(jsonescape, '\\$1')}'`;
}
