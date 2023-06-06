import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
    loading: false,
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
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
    doneCategoryMessage(state, { message }) {
      state.doneMessage = message;
    },
    confirmDeleteCategory(state, categories) {
      state.deleteCategory.id = categories.id;
      state.deleteCategory.name = categories.name;
    },
    doneDeleteCategory(state) {
      state.deleteCategory.id = null;
      state.deleteCategory.name = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
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
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: categoryName,
          },
        }).then(() => {
          commit('toggleLoading');
          dispatch('getAllCategories');
          commit('doneCategoryMessage', { message: 'カテゴリーが新規作成されました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    confirmDeleteCategory({ commit }, categoryInfo) {
      commit('confirmDeleteCategory', categoryInfo);
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
      }).then(() => {
        dispatch('getAllCategories');
        commit('doneDeleteCategory');
        commit('doneCategoryMessage', { message: 'カテゴリーが削除されました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
