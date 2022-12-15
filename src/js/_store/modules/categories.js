import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    doneMessage: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
    isLoading: false,
  },
  mutations: {
    allCategories(state, payload) {
      state.categories = payload;
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    doneMessage(state, { message }) {
      state.doneMessage = message;
    },
    errorMessage(state, message) {
      state.errorMessage = message;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
  },
  actions: {
    allCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(data => {
        const categoryList = data.data.categories.reverse();
        commit('allCategories', categoryList);
      }).catch(err => {
        const errroMesssage = err.message;
        commit('errorMessage', errroMesssage);
      });
    },
    createCategory({ commit, rootGetters }, targetCategory) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: targetCategory,
          },
        }).then(() => {
          commit('toggleLoading');
          commit('doneMessage', { message: 'カテゴリー名を登録しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('errorMessage', err.message);
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters, state }) {
      return new Promise(resolve => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
        }).then(() => {
          commit('doneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('errorMessage', err.message);
        });
      });
    },
  },
};
