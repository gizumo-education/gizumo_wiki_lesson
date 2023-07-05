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
    { // ストレージのキーを指定。デフォルトではvuex
      key: 'vuex',

      // 管理対象のステートを指定。pathsを書かない時は`modules`に書いたモジュールに含まれるステート全て。`[]`の時はどれも保存されない
      paths: [
        'articles.pagenation.current_page',
      ],

      // ストレージの種類を指定する。デフォルトではローカルストレージ
      storage: window.sessionStorage,
    },
  )],
});
