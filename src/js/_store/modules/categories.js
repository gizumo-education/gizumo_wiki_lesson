import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      title: '',
      content: '',
      category: {
        id: null,
        name: '',
      },
    },
    categoryList: [],
    deleteCategoryId: null,
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = res.data.categories;
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
