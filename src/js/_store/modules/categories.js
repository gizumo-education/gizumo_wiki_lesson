import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = `${message} : ご確認の上、再度お試しください。`;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        if (res.data.code === 0) throw new Error(res.data.message);
        commit('doneGetAllCategories', res.data.categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
