import Vue from 'vue';
import Data from './data';
import Registry from './registry';
import Template from './template';

var beautify = require('js-beautify').js_beautify;

// keep bundle small
var hljs = require('../node_modules/highlight.js/lib/highlight');
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));

//import uglify from 'uglify-js';

var data = new Data();

data.registry = Registry;

data.render = function () {
    var bs = beautify(Template(this), { indent_size: 2 });
    return hljs.highlightAuto(bs).value;// bs ? hljs.highlight('javascript', bs, true) : bs; //}, { output: { beautify: true } }).code;
}

data.depedencies = function () {
    var dev = ['webpack'];

    for (var l of data.loaders)
        if (l.depends)
            for (var ll of l.depends)
                dev.push(ll)

    return dev.filter((v, i, ary) => ary.findIndex(c => c === v) === i).join(' ')
}

var app = new Vue({
    el: '#app',
    data: data
})

//hljs.initHighlightingOnLoad();
//$('#output').text(Template(data));