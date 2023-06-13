import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    category: state => state.category,
    deleteCategory: state => state.deleteCategory.id,
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    updateCategory(state, payload) {
      state.category = { ...state.category, name: payload.name };
    },
    confirmDeleteCategory(state, { category }) {
      state.deleteCategory = { ...state.deleteCategory, ...category };
    },
    donePostCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
    doneDeleteCategory(state) {
      state.deleteCategory = {
        id: null,
        name: '',
      };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    initCategory(state) {
      state.category = {
        id: null,
        name: '',
      };
    },
    doneDisplayMessage(state, payload) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', categories);
      });
    },
    initCategory({ commit }) {
      commit('initCategory');
    },
    updateCategory({ commit }, name) {
      commit({
        type: 'updateCategory',
        name,
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, category) {
      commit('confirmDeleteCategory', { category });
    },
    postCategory({ commit, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/category'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          const postCategory = response.data.category;
          commit('initCategory');
          commit('toggleLoading');
          commit('donePostCategory', postCategory);
          commit('doneDisplayMessage', { message: 'カテゴリーを追加しました！' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          if (err.data) {
            commit('failRequest', { message: err.response.data.message });
          } else {
            commit('failRequest', { message: err.message });
          }
        });
      });
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `category/${rootGetters['categories/deleteCategory']}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('doneDisplayMessage', { message: 'カテゴリーを削除しました！' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
