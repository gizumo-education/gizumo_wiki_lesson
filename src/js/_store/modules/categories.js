import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
  },
  mutations: {
    doneGetAllCategory(state, { categories }) {
      state.categoryList = categories.reverse();
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategory', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
