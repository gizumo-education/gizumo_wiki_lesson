import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    fetchCategories({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/category',
        }).then(res => {
          const { categories } = res.data;
          commit('setCategories', categories);
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject(err);
        });
      });
    },
  },
};
