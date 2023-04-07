import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList = state.categoryList.reverse();
    },
    setCreatedDoneMessage(state) {
      state.doneMessage = '新規カテゴリーを作成しました。';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit, rootGetters }, name) {
      return new Promise(resolve => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: { name },
        }).then(() => {
          commit('setCreatedDoneMessage');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },
  },
};
