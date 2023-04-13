import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      name: '',
      id: 'null',
    },
    newCategory: {
      name: '',
      id: 'null',
    },
    deleteCategory: {
      name: '',
      id: 'null',
    },
    disabled: false,
    errorMessage: '',
    errorMessagePost: '',
    doneMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload];
    },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload };
      state.newCategory = { ...state.newCategory, ...payload };
    },
    doneEditCategory(state) {
      state.targetCategory = state.newCategory;
      state.newCategory = { ...state.newCategory, name: '' };
    },
    doneUpdateCategory(state, payload) {
      state.newCategory.name = payload;
    },
    donePostCategories(state, { payload }) {
      state.categoryList.unshft(payload);
    },
    doneUpdateValue(state, payload) {
      state.targetCategory.name = payload;
    },
    deleteCategory(state, payload) {
      state.deleteCategory = payload;
    },
    doneDeleteCategory(state) {
      state.deleteCategory = {
        name: '',
        id: 'null',
      };
    },
    clearTargetCategory(state) {
      state.targetCategory = {
        name: '',
        id: 'null',
      };
    },
    switchDisabled(state) {
      state.disabled = !state.disabled;
    },
    failRequest(state, { errorMessage, errorMessagePost }) {
      state.errorMessage = errorMessage;
      state.errorMessagePost = errorMessagePost;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
      state.errorMessagePost = '';
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = res.data.categories.reverse();
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { errorMessage: err.message });
      });
    },
    postCategory({ commit, state, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('switchDisabled');
        const data = {
          name: state.targetCategory.name,
        };
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました。' });
          resolve();
        }).catch(() => {
          commit('failRequest', { errorMessagePost: 'カテゴリー作成に失敗しました。' });
        }).finally(() => {
          commit('switchDisabled');
          commit('clearTargetCategory');
        });
      });
    },
    editCategory({ commit, state, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('switchDisabled');
        const data = {
          name: state.newCategory.name,
        };
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${state.newCategory.id}`,
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを更新しました。' });
          commit('doneEditCategory');
          resolve();
        }).catch(() => {
          commit('failRequest', { errorMessage: 'カテゴリー更新に失敗しました。' });
        }).finally(() => {
          commit('switchDisabled');
        });
      });
    },
    updateValue({ commit }, targetCategory) {
      const payload = targetCategory;
      commit('doneUpdateValue', payload);
    },
    getCategory({ commit, rootGetters }, categoryId) {
      return new Promise(resolve => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${categoryId}`,
        }).then(res => {
          const payload = res.data.category;
          commit('doneGetCategory', payload);
          resolve();
        }).catch(err => {
          commit('failRequest', { errorMessage: err.message });
        });
      });
    },
    updatedCategory({ commit }, categoryName) {
      const payload = categoryName;
      commit('doneUpdateCategory', payload);
      commit('clearMessage');
    },
    setTargetCategory({ commit }, deleteCategory) {
      commit('clearMessage');
      const payload = deleteCategory;
      commit('deleteCategory', payload);
    },
    deleteCategory({ commit, state, rootGetters }) {
      const data = {
        id: state.deleteCategory.id,
      };
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${state.deleteCategory.id}`,
        data,
      }).then(() => {
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
      }).catch(err => {
        commit('failRequest', { errorMessage: err.message });
      });
    },
    showMessage({ commit }) {
      commit('failRequest', { errorMessage: 'カテゴリー名が変更されていません' });
    },
    clearTargetCategory({ commit }) {
      commit('clearTargetCategory');
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
