import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    targetCategory: {
      id: null,
      name: '',
    },
    category: {
      id: null,
      name: '',
    },
    deleteCategoryName: '',
    deleteCategoryId: null,
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList = state.categoryList.reverse();
    },
    doneGetTargetCategory(state, payload) {
      state.targetCategory.name = payload.name;
      state.targetCategory.id = payload.id;
    },
    editedTitle(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    editedCategoryName(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload };
      state.doneMessage = 'カテゴリーの変更が完了しました。';
      state.errorMessage = '';
    },
    setDeleteCategoryInfo(state, payload) {
      state.deleteCategoryName = payload.categoryName;
      state.deleteCategoryId = payload.categoryId;
    },
    doneDeleteCategory(state) {
      const index = state.categoryList.findIndex(i => i.id === state.deleteCategoryId);
      state.categoryList.splice(index, 1);
      state.doneMessage = 'カテゴリーの削除が完了しました。';
      state.deleteCategoryId = null;
    },
    newAddCategory(state, payload) {
      state.categoryList.unshift(payload);
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategoryList({ commit, rootGetters }) {
      commit('clearMessage');
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
    getTargetCategory({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(response => {
        const payload = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('doneGetTargetCategory', payload);
      });
    },
    editedCategoryName({ commit, rootGetters, state }, updateCategory) {
      const targetCategory = state.categoryList.find(
        category => category.id === updateCategory.id,
      );
      if (
        targetCategory.name === updateCategory.name
      ) {
        commit('failRequest', { message: '変更内容が変わっていません' });
        return;
      }
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${updateCategory.id}`,
        data: {
          name: updateCategory.name,
        },
      }).then(response => {
        const payload = {
          name: response.data.category.name,
        };
        commit('editedCategoryName', payload);
        commit('toggleLoading');
      }).catch(err => {
        commit('toggleLoading');
        commit('clearMessage');
        commit('failRequest', { message: err.message });
      });
    },
    updateCategoryName({ commit }, name) {
      commit({
        type: 'editedTitle',
        name,
      });
    },
    setDeleteCategoryInfo({ commit }, { id, name }) {
      const payload = {
        categoryId: id,
        categoryName: name,
      };
      commit('setDeleteCategoryInfo', payload);
    },
    deleteCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${state.deleteCategoryId}`,
        data: { id: this.deleteCategoryId },
      }).then(() => {
        commit('toggleLoading');
        commit('doneDeleteCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    addCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: { name: categoryName },
      }).then(response => {
        const payload = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('toggleLoading');
        commit('newAddCategory', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
