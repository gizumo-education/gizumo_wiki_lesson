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
    doneDeleteCategory(state, deletedCategoryId) {
      const deleteIndex = state.categoryList.findIndex(v => v.id === deletedCategoryId);
      state.categoryList.splice(deleteIndex, 1);
      state.doneMessage = 'カテゴリーを削除しました。';
    },
  },

  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
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
    deleteCategory({ commit, rootGetters }, deleteCategoryId) {
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${deleteCategoryId}`,
      }).then(res => {
        commit('doneDeleteCategory', res.data.category.id);
      }).catch(err => {
        commit('failRequest', err);
      });
    },
  },
};
