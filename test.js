import test from 'ava';
import {default as registry} from './js/registry';

test(t => {
	registry.loaders.forEach(el => {
		t.true(el.name !== '');
	});

	registry.plugins.forEach(el => {
		t.true(el.name !== '');
	});
});
