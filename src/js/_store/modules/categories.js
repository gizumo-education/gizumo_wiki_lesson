import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      category: {
        name: '',
      },
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
    deleteCategoryId: null,
  },
  getters: {
    targetCategory: state => state.targetCategory,
    categoryList: state => state.categoryList,
    deleteCategoryId: state => state.deleteCategoryId,

  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.targetCategory.category.name = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    displayErrorMessage(state, payload = { message: '失敗しました' }) {
      state.doneMessage = payload.message;
    },
    updateValue(state, payload) {
      state.targetCategory.category.name = payload.category;
    },
    newCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    resetView(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    confirmDeleteId(state, { categoryId }) {
      state.deleteCategoryId = categoryId;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    deletedCategoryList(state, payload) {
      return state.categoryList.splice(payload, 1);
    },
  },
  actions: {
    resetView({ commit }) {
      commit('resetView');
    },
    updateValue({ commit }, categoryName) {
      const name = categoryName;
      const payload = {
        category: name,
      };
      commit('updateValue', payload);
    },
    postCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/targetCategory'].category.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
        commit('newCategory', res.data.category);
        commit('toggleLoading');
        commit('clearMessage');
      }).catch(() => {
        commit('displayErrorMessage', { message: 'カテゴリー取得に失敗しました' });
        commit('toggleLoading');
        commit('clearMessage');
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
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
    confirmDeleteId({ commit }, categoryId) {
      commit('confirmDeleteId', { categoryId });
    },
    deleteCategory({ commit, rootGetters }) {
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/deleteCategoryId']);
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        data,
      }).then(() => {
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
        commit('deletedCategoryList', rootGetters['categories/deleteCategoryId']);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
