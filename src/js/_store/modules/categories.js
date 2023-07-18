import axios from '@Helpers/axiosDefault';

export default {
  state: {
    namespaced: true,
    category: '',
    errorMessage: '',
    doneMessage: '',
    disabled: '',
    categoryList: [],
  },
  mutations: {
    initPostCategory(state) {
      state.targetArticle = {
        id: null,
        title: '',
        content: '',
        category: {
          id: null,
          name: '',
        },
      };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
