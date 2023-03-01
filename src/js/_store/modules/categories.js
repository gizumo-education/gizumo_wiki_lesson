import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    doneMessage: '',
    errorMessage: '',
    category: '',
    tHeads: ['カテゴリー名'], // 仮
    categories: [],
  },
  getters: {},
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categories = [...payload.categories.reverse()];
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
      commit('clearMessage');
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
