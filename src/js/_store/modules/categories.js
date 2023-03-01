import axios from 'axios';

export default {
  namespaced: true,
  state: {
    doneMessage: '',
    errorMessage: '',
    categoryPostInputValue: '',
    tHeads: ['カテゴリー名'],
    categories: [],
  },
  getters: {},
  mutations: {
    doneGetAllCategories(state, payload) {
      if (typeof payload.categories === 'object') {
        payload.categories.reverse();
      }
      state.categories = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      })
        .then(res => {
          const payload = { categories: res.data.categories };
          commit('doneGetAllCategories', payload);
        })
        .catch(err => {
          commit('failRequest', { message: err.message });
        });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
