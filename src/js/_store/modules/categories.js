import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    editingCategory: {
      id: null,
      name: '',
    },
    theads: '',
    errorMessage: '',
    categoriesList: [],
    updateName: {
      id: null,
      name: '',
    },
    doneMessage: '',
    disabled: false,
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        title: '',
        content: '',
        name: '',
      };
    },
    updateCategory(state, payload) {
      state.updateName.name = payload;
    },
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleDisable(state) {
      state.disabled = !state.disabled;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    clearUpdateName(state) {
      state.updateName = { id: 'null', name: '' };
    },
    doneMessage(state, { message }) {
      state.doneMessage = message;
    },
    confirmDeleteCategory(state, payload) {
      state.deleteCategory = payload;
    },
    doneDeleteCategory(state) {
      state.deleteCategory.id = null;
      state.deleteCategory.name = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload };
      state.editingCategory = { ...state.editingCategory, ...payload };
    },
    doneUpdateCategory(state, payload) {
      state.editingCategory.name = payload;
    },
    doneEditCategory(state) {
      state.targetCategory = state.editingCategory;
      state.editingCategory = { ...state.editingCategory, name: '' };
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories.reverse(),
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({ commit }, updateName) {
      const payload = updateName;
      commit('updateCategory', payload);
      commit('clearMessage');
    },
    postCategory({
      commit, rootGetters, state, dispatch,
    }) {
      commit('clearMessage');
      commit('toggleDisable');
      const data = state.updateName;
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(() => {
        dispatch('getAllCategories');
        commit('clearUpdateName');
        commit('clearMessage');
        commit('doneMessage', { message: 'カテゴリーの追加に成功しました' });
      }).then(() => {
        commit('toggleDisable');
      }).catch(err => {
        commit('toggleDisable');
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, { id, name }) {
      const payload = { id, name };
      commit('confirmDeleteCategory', payload);
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
      }).then(() => {
        commit('doneDeleteCategory');
        dispatch('getAllCategories');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
      }).catch(() => {
        commit(')failRequest');
      });
    },
    getCategory({ commit, rootGetters }, categoryId) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res => {
        const payload = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('doneGetCategory', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, updateName) {
      const payload = updateName;
      commit('doneUpdateCategory', payload);
      commit('clearMessage');
    },
    editCategory({ commit, state, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleDisable');
        const data = {
          name: state.editingCategory.name,
        };
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${state.editingCategory.id}`,
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを更新しました。' });
          commit('doneEditCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        }).finally(() => {
          commit('toggleDisable');
        });
      });
    },
    showMessage({ commit }) {
      commit('failRequest', { Message: 'カテゴリー名が変更されていません' });
    },
  },
};
