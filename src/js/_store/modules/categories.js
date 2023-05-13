import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
  },
  mutations: {
    doneGetCategories(state, categoriesList) {
      state.categories = [...categoriesList.reverse()];
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
        const categoriesList = res.data.categories;
        commit('doneGetCategories', categoriesList);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
