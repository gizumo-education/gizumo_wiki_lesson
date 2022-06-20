import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = payload;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    getAllCategoriesByDesc({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        const reverseCategories = data.categories.reverse();
        commit('doneGetAllCategories', reverseCategories);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
