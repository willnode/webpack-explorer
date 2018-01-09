import $ from 'jquery';
import Data from './data';
import Template from './template';

var data = new Data();

$('#output').text(Template(data));