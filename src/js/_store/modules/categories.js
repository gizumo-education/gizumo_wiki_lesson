import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categories: [],
    errorMessage: '',
  },
  mutations: {
    allCategories(state, payload) {
      state.categories = payload;
    },
    errorRequest(state, message) {
      state.errorMessage = message;
    },
  },
  actions: {
    allCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(data => {
        const categoryList = data.data.categories.reverse();
        commit('allCategories', categoryList);
      }).catch(err => {
        const errroMesssage = err.message;
        commit('errorRequest', errroMesssage);
      });
    },
  },
};
