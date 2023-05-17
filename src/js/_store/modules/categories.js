import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    targetCategory: '',
    disabled: false,
    doneMessage: '',
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  mutations: {
    addCategory(state, addCategory) {
      state.categories.unshift(addCategory);
    },
    setTargetCategory(state, category) {
      state.targetCategory = category;
    },
    doneGetCategories(state, categoriesList) {
      state.categories = [...categoriesList.reverse()];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.disabled = !state.disabled;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    clearTargetInput(state) {
      state.targetCategory = '';
    },
    confirmDeleteCategory(state, confirmCategory) {
      state.deleteCategory.id = confirmCategory.id;
      state.deleteCategory.name = confirmCategory.name;
    },
    doneDeleteCategory(state) {
      state.deleteCategory.id = null;
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategory.id,
  },
  actions: {
    setTargetCategory({ commit }, category) {
      commit('setTargetCategory', category);
    },
    addCategory({ commit, rootGetters }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = {
        name: rootGetters['categories/targetCategory'],
      };
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        commit('toggleLoading');
        const addedCategory = res.data.category;
        commit('addCategory', addedCategory);
        commit('clearTargetInput');
        commit('displayDoneMessage', { message: 'カテゴリーを追加しました' });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const categoriesList = res.data.categories;
        commit('doneGetCategories', categoriesList);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, confirmCategory) {
      commit('confirmDeleteCategory', confirmCategory);
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        }).then(() => {
          commit('doneDeleteCategory');
          resolve();
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
