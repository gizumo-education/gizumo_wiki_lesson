import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategory(state, { categories }) {
      state.categoryList = categories.reverse();
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneCreateCategory(state) {
      state.doneMessage = 'カテゴリーが新規作成されました';
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
    addCategory({ commit, rootGetters, dispatch }, categoryName) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: categoryName,
        },
      }).then(() => {
        dispatch('getAllCategories');
        commit('doneCreateCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
