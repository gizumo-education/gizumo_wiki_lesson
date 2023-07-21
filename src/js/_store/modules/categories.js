import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categories: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
    targetCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteArticleId = null;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    clearCategory(state) {
      state.targetCategory.name = '';
    },
    doneGetAllCategories(state, payload) {
      state.categories = [...payload.categories.reverse()];
      state.loading = false;
    },
    donePostCategory(state, payload) {
      state.categories.unshift(payload.category);
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updateCategoryName(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    updateCategoryName({ commit }, name) {
      commit({
        type: 'updateCategoryName',
        name,
      });
    },
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        const payload = {
          categories: response.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // 新規カテゴリー作成
    postCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', state.targetCategory.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        const payload = {
          category: response.data.category,
        };
        commit('donePostCategory', payload);
        commit('clearCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      }).finally(() => {
        commit('toggleLoading');
      });
    },
    confirmCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    // カテゴリー削除
    deleteCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
