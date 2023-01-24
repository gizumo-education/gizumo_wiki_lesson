import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
    loading: false,
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList;
    },
  },
  mutations: {
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories;
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneCreateCategory(state) {
      state.loading = false;
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    applyRequest(state) {
      state.loading = true;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const categories = response.data.categories.reverse();
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }, category) {
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
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
