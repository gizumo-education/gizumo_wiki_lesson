import Vue from 'vue';
import Vuex from 'vuex';
import {
  auth, articles, users,
} from './modules';
import categories from './modules/categories';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    articles,
    users,
    categories,
  },
});
