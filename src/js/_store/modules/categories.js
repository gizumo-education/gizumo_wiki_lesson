import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: '',
    categoriesList: [],
    deleteCategoriesList: null,
    errorMessage: '',
    doneMessage: '',
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    setCategories(state, { categories }) {
      state.categoriesList = categories;
    },
  },
  actions: {
    getCategoryList({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const categories = res.data.categories.reverse();
        commit('setCategories', { categories });
        commit('clearMessage');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
