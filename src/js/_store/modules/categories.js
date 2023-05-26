import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      category: {
        id: null,
        name: '',
      },
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
    deleteCategoryId: null,
    openModal: false,
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.doneMessage = '';
    },
    mutateCategories(state, payload) {
      state.categoryList = payload.categories.reverse();
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    targetCategory(state, payload) {
      state.targetCategory.category.name = payload.categoryName;
    },
    confirmDeleteCategory(state, { categoryId }) {
      state.deleteCategoryId = categoryId;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    clearMessages(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    clearInit(state) {
      state.targetCategory.category.name = '';
    },
  },
  actions: {
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('mutateCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters, dispatch }) {
      commit('toggleLoading');
      commit('clearMessages');
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/targetCategory'].category.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(() => {
        dispatch('getCategories');
        commit('toggleLoading');
        commit('clearInit');
        commit('displayDoneMessage', { message: '成功しました' });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    targetCategory({ commit }, categoryName) {
      commit({
        type: 'targetCategory',
        categoryName,
      });
    },
    confirmDeleteCategory({ commit }, categoryId) {
      commit('confirmDeleteCategory', { categoryId });
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      commit('clearMessages');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/deleteCategoryId']);
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        data,
      }).then(() => {
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'カテゴリを削除しました' });
        dispatch('getCategories');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessages({ commit }) {
      commit('clearMessages');
    },
  },
};
