import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import {
  auth, articles, users, categories,
} from './modules';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    articles,
    users,
    categories,
  },
  plugins: [createPersistedState(
    {
      key: 'vuex',
      paths: [
        'articles.currentPage',
      ],
      storage: window.sessionStorage,
    },
  )],
});
