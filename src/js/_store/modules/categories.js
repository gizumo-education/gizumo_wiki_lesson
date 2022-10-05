import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
    deleteCategoryId: null,
    deleteCategoryName: '',
  },

  mutations: {
    setCategoryList(state, payload) {
      state.categoryList = payload;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーを追加しました。';
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーを削除しました';
    },
  },

  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('setCategoryList', res.data.categories.reverse());
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');
      return new Promise(resolve => {
        const params = new URLSearchParams();
        params.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          params,
        }).then(() => {
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }, categoryId) {
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${categoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
