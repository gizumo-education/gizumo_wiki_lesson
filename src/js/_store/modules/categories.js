import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    category: {
      id: null,
      name: '',
    },
  },

  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    applyRequest(state) {
      state.loading = true;
    },
    doneCreateCategory(state) {
      state.loading = false;
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (!response.data.categories) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // カテゴリー新規作成
    createCategory({ commit, rootGetters }, category) {
      commit('applyRequest');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: category,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('doneCreateCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
