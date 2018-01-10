import Vue from 'vue';
import App from '../app.vue';

var vue = new Vue({
    el: '#app',
    render: h => h(App)
})

window.vue = vue.$children[0];
window.update = vue.$children[0].loader_choose;