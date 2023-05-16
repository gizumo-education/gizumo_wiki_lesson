import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      title: '',
      content: '',
      category: {
        id: null,
        name: '',
      },
      user: {
        account_name: '',
        created_at: '',
        email: '',
        full_name: '',
        id: '',
        password_reset_flg: null,
        role: '',
        updated_at: '',
      },
    },
    categoryList: [],
    loading: false, // 判定→「作成中...」に変化
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteArticle: state => state.deleteArticleId,
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    mutateCategories(state, payload) {
      state.categoryList = payload.categories.reverse();
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    targetCategory(state, payload) {
      state.targetCategory.category.name = payload.categoryName;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
      // 入力内容を空にする！
      state.targetCategory.category.name = '';
    },
  },
  actions: {
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        // resのデータから一覧を取得
        const payload = {
          categories: res.data.categories,
        };
        commit('mutateCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters, dispatch }) {
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        // rootGetters→オブジェクト形式で取得できる！
        data.append('name', rootGetters['categories/targetCategory'].category.name);
        if (rootGetters['categories/targetCategory'].category.name !== null) {
          data.append(
            'category_id',
            rootGetters['categories/targetCategory'].category.name,
          );
        }
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          dispatch('getCategories');
          commit('clearMessage');
          resolve();
        }).catch(() => {
          commit('toggleLoading');
          reject();
        });
      });
    },
    targetCategory({ commit }, categoryName) {
      commit({
        type: 'targetCategory',
        categoryName,
      });
    },
  },
};
