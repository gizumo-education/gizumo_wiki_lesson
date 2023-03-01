import Vue from 'vue';

import '../styles/scss/style.scss';
import 'highlight.js/styles/gruvbox-dark.css';
import VeeValidate, { Validator } from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import vueSmoothScroll from 'vue-smoothscroll';

import App from '@Pages/index.vue';
import AppModal from '@Components/atoms/Modal/index.vue';
import router from './_router';
import store from './_store';

Validator.localize('ja', ja);
Vue.use(VeeValidate, { locale: ja });
Vue.use(vueSmoothScroll);
Vue.component('AppModal', AppModal);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
