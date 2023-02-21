import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
  },

  mutations: {
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList = state.categoryList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    donePostCategory(state, newCategory) {
      state.categoryList.unshift(newCategory);
      state.doneMessage = 'カテゴリーを作成しました。';
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
        commit('doneGetAllCategories', payload);
        commit('clearMessage');
      }).catch(err => {
        commit('failRequest', err);
      });
    },
    postCategory({ commit, rootGetters }, category) {
      const data = new FormData();
      data.append('name', category);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        const newCategory = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('donePostCategory', newCategory);
      }).catch(err => {
        commit('failRequest', err);
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
