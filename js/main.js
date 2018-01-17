import Vue from 'vue';
import App from '../src/app.vue';

const vue = new Vue({
	el: '#app',
	render: h => h(App)
});

// For those who curious
window.vue = vue.$children[0];
