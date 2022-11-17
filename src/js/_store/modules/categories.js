import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoryList: [],
    disabled: false,
    errorMessage: '',
    doneMessage: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
  },
  getters: {
    deleteCategoryId: state => state.deleteCategoryId,
    deleteCategoryName: state => state.deleteCategoryName,
  },
  mutations: {
    initCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
    },
    doneGetCategories(state, payload) {
      state.targetCategory = { ...payload };
    },
    editedName(state, payload) {
      state.targetCategory.name = payload;
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    updateCategory(state, { targetCategory }) {
      state.targetCategory = { ...state.targetCategory, ...targetCategory };
    },
    confirmDeleteCategories(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
    toggleDisabled(state) {
      state.disabled = !state.disabled;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    initCategory({ commit }) {
      commit('initCategory');
    },
    getAllCategories({ commit, rootGetters }) {
      commit('clearMessage');
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
    getCategories({ commit, rootGetters }, categoryId) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res => {
        if (res.data.code === 0) throw new Error(res.data.message);
        const payload = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('doneGetCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    editedName({ commit }, name) {
      commit('editedName', name);
    },
    updateCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      commit('toggleDisabled');
      const data = new URLSearchParams();
      data.append('name', state.targetCategory.name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.targetCategory.id}`,
        data,
      }).then(() => {
        commit('toggleDisabled');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(err => {
        commit('toggleDisabled');
        commit('failRequest', { message: err.message });
      });
    },
    confirmDeleteCategories({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategories', { categoryId, categoryName });
    },
    deleteCategories({ commit, rootGetters, state }) {
      commit('clearMessage');
      return new Promise(resolve => {
        const data = new URLSearchParams();
        data.append('id', state.deleteCategoryId);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
          data,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    postCategories({ commit, rootGetters }, targetCategory) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleDisabled');
        const data = new URLSearchParams();
        data.append('name', targetCategory);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleDisabled');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleDisabled');
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
