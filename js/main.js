import Vue from 'vue';
import App from '../src/app.vue';

var vue = new Vue({
    el: '#app',
    render: h => h(App)
})

// for those who curious
window.vue = vue.$children[0];