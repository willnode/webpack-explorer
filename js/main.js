import $ from 'jquery';
import Vue from 'vue';
import Data from './data';
import Template from './template';
var beautify = require('js-beautify').js_beautify;
//import uglify from 'uglify-js';

var data = new Data();

data.render = function () {
    return beautify(Template(this)); //}, { output: { beautify: true } }).code;
}

var app = new Vue({
    el: '#app',
    data: data,
    methods: {

    }
})

//$('#output').text(Template(data));