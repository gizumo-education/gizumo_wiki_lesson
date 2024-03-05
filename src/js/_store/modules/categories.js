import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      id: null,
      name: '',
    },
    loading: false,
    doneMessage: '',
    errorMessage: '',
    deleteCategoryName: null,
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryName: state => state.deleteCategory.name,
    deleteCategoryId: state => state.deleteCategory.id,
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categoryList = [...payload.categories].reverse();
    },
    doneDeleteCategory(state) {
      state.deleteCategory = {
        id: null,
        name: '',
      };
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategory = {
        id: categoryId,
        name: categoryName,
      };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    editedCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    updateCategory(state, payload) {
      state.targetCategory = payload.category;
    },
    doneGetCategory(state, payload) {
      state.targetCategory = payload.category;
    },
    editedName(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    clearTargetCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
    },
  },
  actions: {
    clearTargetCategory({ commit }) {
      commit('clearTargetCategory');
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    getCategoriesDetail({ commit, rootGetters }, categoryId) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${categoryId}`,
        }).then(res => {
          const category = res.data.category
            ? res.data.category
            : { id: null, name: '' };
          const payload = {
            category: {
              id: category.id,
              name: category.name,
            },
          };
          commit('doneGetCategory', payload);
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    editedName({ commit }, name) {
      commit({
        type: 'editedName',
        name,
      });
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/targetCategory'].id);
      data.append('name', rootGetters['categories/targetCategory'].name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${rootGetters['categories/targetCategory'].id}`,
        data,
      }).then(res => {
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
          },
        };
        commit('updateCategory', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'ドキュメントを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
    editedCategory({ commit }, name) {
      commit({
        type: 'editedCategory',
        name,
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        }).then(() => {
          resolve();
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
        }).catch(err => {
          reject();
          commit('failRequest', { message: err.message });
        });
      });
    },
    postCategories({ commit, rootGetters }) {
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/targetCategory'].name);
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          resolve();
          commit('toggleLoading');
          commit('editedCategory', { name: '' });
          commit('displayDoneMessage', { message: 'カテゴリを作成しました' });
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
