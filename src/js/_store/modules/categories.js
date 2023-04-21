import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    theads: '',
    errorMessage: '',
    categoriesList: [],
    updateName: {
      id: 'null',
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
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
  },
  mutations: {
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
    doneFilteredCategories(state, payload) {
      const filteredCategories = payload.categories.filter(
        category => category.category && category.category.name === payload.category,
      );
      state.categoriesList = [...filteredCategories];
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
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
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      const payload = { id: categoryId, name: categoryName };
      commit('confirmDeleteCategory', payload);
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/deleteCategoryId']);
      data.append('name', rootGetters['categories/deleteCategoryName']);
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        data,
      }).then(() => {
        commit('doneDeleteCategory');
        dispatch('getAllCategories');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
      }).catch(() => {
        commit(')failRequest');
      });
    },
    filteredCategories({ commit, rootGetters }, category) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/category',
        }).then(res => {
          const payload = {
            category,
            categories: res.data.categories,
          };
          commit('doneFilteredCategories', payload);
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject(new Error('エラーが発生しました'));
        });
      });
    },
  },
};
