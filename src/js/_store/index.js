import Vue from 'vue';
import Vuex from 'vuex';
import {
  auth, articles, users, category,
} from './modules';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    articles,
    users,
    category,
  },
});
