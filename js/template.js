import Data from './data';

export const jsonescape = /(['\\])/g;

export function parseloader(head, plugin, scheme) {
	if (scheme.head && head) {
		if (Array.isArray(scheme.head)) {
			for (const hd of scheme.head) {
				head.push(hd);
			}
		} else {
			head.push(scheme.head);
		}
	}
	if (scheme.plugin && plugin) {
		if (Array.isArray(scheme.plugin)) {
			for (const hd of scheme.plugin) {
				plugin.push(parsestring(hd));
			}
		} else {
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
		} else {
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
	} else if (Array.isArray(str)) {
		return `[ ${str.map(s => parsestring(s)).filter(Boolean).join(', ')} ]`;
	}

	const s = [];
	for (const prop in str) {
		if (str[prop] !== undefined) {
			s.push(parseparam(prop, str[prop]));
		}
	}
	return `{ ${s.filter(Boolean).join(', ')} }`;
}

function parseparam(name, value) {
	if (value === undefined) {
		return '';
	}
	return name + ': ' + parsestring(value);
}

function resolvepath(path = '') {
	if (Array.isArray(path)) {
		return path.map(v => resolvepath(v));
	} else if (typeof path === 'object') {
		path = Object.assign({}, path);
		for (const i in path) {
			if (path[i] !== undefined) {
				path[i] = resolvepath(path[i]);
			}
		}
		return path;
	}

	if (path.substr(0, 2) === '..') {
		return path;
	} else if (path.substr(0, 2) === './') {
		return path;
	} else if (path.charAt(0) === '/') {
		return '.' + path;
	}
	return './' + path;
}

function parseentry(entry = []) {
	if (entry.length === 0) {
		return '{}';
	}
	const usekeys = entry.every(v => v.key);
	if (usekeys) {
		return `{${entry.map(v => parseparam(v.key, resolvepath(v.value))).filter(Boolean).join(',')}}`;
	} else if (entry.length === 1) {
		return `'${resolvepath(entry[0].value).replace(jsonescape, '\\$1')}'`;
	}
	return `[${entry.map(v => parsestring(resolvepath(v.value))).filter(Boolean).join(',')}]`;
}

function resolveWithPath(head, path) {
	head.push(`const path = requires('path')`);
	return `FUNC: path.resolve(__dirname, '${path}')`;
}

export default function (data = new Data()) {
	let head = [];
	const plugin = [];

	const ret = 'module.exports = {' +
		[
			'entry: ' + parseentry(data.entry),
			parseparam('output', {
				// Rack up path individually
				filename: data.output.filename || undefined,
				path: data.output.path ? resolveWithPath(head, resolvepath(data.output.path)) : undefined,
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

