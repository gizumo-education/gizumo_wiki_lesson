import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categories = [...payload.reverse()];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = res.data.categories;
        commit('doneGetCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
