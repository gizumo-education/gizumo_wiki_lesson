import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    categoriesList: [],
    doneMessage: '',
    errorMessage: '',
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories.reverse()];
    },
    doneCreateCategory(state) {
      state.doneMessage = 'カテゴリーが作成されました。';
    },
    confirmDeleteCategory(state, { categoryId }) {
      state.deleteCategoryId = categoryId;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    displayDoneMessage(state, { message } = { message: '成功しました' }) {
      state.doneMessage = message;
    },
    afterDoneClearMessage(state) {
      state.doneMessage = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    setTargetCategory(state, { categoryId, categoryName }) {
      state.deleteCategory.id = categoryId;
      state.deleteCategory.name = categoryName;
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
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit, rootGetters, dispatch }, categoryName) {
      return new Promise(resolve => {
        const data = new URLSearchParams();
        data.append('name', categoryName);
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          dispatch('getAllCategories');
          commit('doneCreateCategory');
          commit('toggleLoading');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    setTargetCategory({ commit }, { categoryId, categoryName }) {
      commit('setTargetCategory', { categoryId, categoryName });
    },
    confirmDeleteCategory({ commit }, categoryId) {
      commit('confirmDeleteCategory', { categoryId });
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      return new Promise(resolve => {
        commit('afterDoneClearMessage');
        const data = new URLSearchParams();
        data.append('id', rootGetters['categories/deleteCategoryId']);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
          data,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
          dispatch('getAllCategories');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('afterDoneClearMessage');
      commit('clearErrorMessage');
    },
  },
};
