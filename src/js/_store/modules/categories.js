import axios from '@Helpers/axiosDefault';

/* eslint-disable no-console */
export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList = state.categoryList.reverse();
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
        console.log('categories');
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        console.log(err);
        commit('failRequest', { message: err.message });
      });
    },
  },
};
