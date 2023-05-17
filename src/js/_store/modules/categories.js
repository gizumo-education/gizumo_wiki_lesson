import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    categoryPost: [],
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        const categoryList = data.categories;
        commit('doneGetAllCategories', categoryList);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
