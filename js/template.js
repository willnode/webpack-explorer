import Data from './data';

const jsontojs = /[\"\'](\w+)[\"\']\:/g;
export var jsonescape = /([\'\\])/g;

export function parseloader(head, plugin, scheme) {
	if (scheme.head && head) {
		if (Array.isArray(scheme.head)) {
			for (var hd of scheme.head) {
				head.push(hd);
			}
		}	else {
			head.push(scheme.head);
		}
	}
	if (scheme.plugin && plugin) {
		if (Array.isArray(scheme.plugin)) {
			for (var hd of scheme.plugin) {
				plugin.push(parsestring(hd));
			}
		}	else {
			plugin.push(parsestring(scheme.plugin));
		}
	}

	return `{ ${
[
	parseparam('test', scheme.test),
	parseparam('enforce', scheme.enforce),
	parseparam('exclude', scheme.exclude),
	parseparam('include', scheme.include),
	parseparam('use', scheme.use)
].filter(Boolean).join(', ')
        }, }`;
}

export function parseplugin(head, scheme) {
	if (scheme.head && head) {
		if (Array.isArray(scheme.head)) {
			for (const hd of scheme.head) {
				head.push(hd);
			}
		}	else {
			head.push(scheme.head);
		}
	}

	return [
		parsestring(scheme.plugin)
	].filter(Boolean).join(', ');
}

export function parsestring(str) {
	if (str === undefined) {
		return '';
	}
	const type = typeof str;
	if (type === 'string') {
		if (str.substring(0, 6) === 'FUNC: ') {
			return str.substring(6);
		} // Little hack
		return `'${str.replace(jsonescape, '\\$1')}'`;
	} else if (str instanceof RegExp || type === 'boolean' || type === 'number') {
		return str.toString();
	}	else if (Array.isArray(str)) {
		return `[ ${str.map(s => parsestring(s)).filter(Boolean).join(', ')} ]`;
	}

	const s = [];
	for (const prop in str) {
		s.push(parseparam(prop, str[prop]));
	}
	return `{ ${s.filter(Boolean).join(', ')} }`;
}

function parseparam(name, value) {
	if (value === undefined) {
		return '';
	}
	return name + ': ' + parsestring(value);
}

function resolvepath(head = [], path = '', absolute) {
	if (Array.isArray(path)) {
		return path.map(v => resolvepath(head, v, absolute));
	} else if (typeof path === 'object') {
		path = Object.assign({}, path);
		for (const i in path) {
			path[i] = resolvepath(head, path[i], absolute);
		}
		return path;
	}

	if (path.includes('/')) {
		if (absolute) {
			head.push(`const path = require('path')`);
			return `FUNC: path.resolve(__dirname, '${path}')`;
		} else if (path.length > 1) {
			if (path.substr(0, 2) === '..') {
				return path;
			}	else if (path.substr(0, 2) === './') {
				return path;
			}	else if (path.charAt(0) === '/') {
				return '.' + path;
			}
			return './' + path;
		}
	} else {
		return path;
	}
}

function parseentry(head, entry = []) {
	if (entry.length === 0) {
		return '{}';
	}
	const usekeys = entry.every(v => v.key);
	if (usekeys) {
		return `{${entry.map(v => parseparam(v.key, resolvepath(head, v.value, false))).filter(Boolean).join(',')}}`;
	} else if (entry.length === 1) {
		return `'${resolvepath(head, entry[0].value, false).replace(jsonescape, '\\$1')}'`;
	}
	return `[${entry.map(v => parsestring(resolvepath(head, v.value, false))).filter(Boolean).join(',')}]`;
}

export default function (data = new Data()) {
	let head = [];
	const plugin = [];

	const ret = 'module.exports = {' +
[
	'entry: ' + parseentry(head, data.entry),
	parseparam('output', {
                // Rack up path individually
		filename: data.output.filename || undefined,
		path: resolvepath(head, data.output.path, true) || undefined,
		publicPath: data.output.publicPath || undefined,
		library: data.output.library || undefined
	}),
            (data.loaders.length > 0 && `module: { rules: [ ${
                data.loaders.map(v => parseloader(head, plugin, v)).join(', ')} ] } `),
            ((plugin.length > 0 || data.plugins.length > 0) && `plugins: [ ${
                data.plugins.map(v => parseplugin(head, v)).concat(plugin).join(', ')} ]`)
].filter(Boolean).join(', ') +
        '}';

	if (head.length > 0) {
		head = head.filter((v, i, a) => a.indexOf(v) === i).filter(Boolean);
		head.push('', '');
	}

	return head.join('\n') + ret;
}

