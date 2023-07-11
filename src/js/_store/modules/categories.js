import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    fetchCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const { categories } = res.data;
        commit('setCategories', categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
