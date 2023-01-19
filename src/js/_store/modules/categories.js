import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: [{
      id: '',
      name: '',
    }],
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
  },
  mutations: {
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload.category };
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories;
      state.loading = false;
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
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const categories = response.data.categories.reverse();
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
