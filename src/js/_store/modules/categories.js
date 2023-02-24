import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
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
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    doneCreateCategory(state) {
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (!response.data.categories) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('toggleLoading');
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    // カテゴリー新規作成
    createCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: categoryName,
        }).then(response => {
          commit('toggleLoading');
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('doneCreateCategory');
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
