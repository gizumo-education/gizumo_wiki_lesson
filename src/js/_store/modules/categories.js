import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    errorMessage: '',
    categoryDetail: {
      deleteCategoryName: '',
      deleteCategoryId: null,
    },
    doneMessage: '',
    disabled: false,
  },
  getters: {
    category: state => state.category,
    categoryDetail: state => state.categoryDetail,
  },
  mutations: {
    addCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
    clearMessage(state) {
      state.errorMessage = '';
    },
    clearDoneMessage(state) {
      state.doneMessage = '';
    },
    confirmDeleteCategory(state, categoryDetail) {
      state.categoryDetail.deleteCategoryName = categoryDetail.categoryName;
      state.categoryDetail.deleteCategoryId = categoryDetail.categoryId;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    doneEditCategory(state, { editedCategory }) {
      state.category = { ...state.category, ...editedCategory };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    doneGetCategory(state, payload) {
      state.category = { ...state.category, ...payload.category };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    initCategory(state) {
      state.category = {
        id: null,
        name: '',
      };
    },
    toggleLoading(state) {
      state.disabled = !state.disabled;
    },
    updateValue(state, payload) {
      state.category = { ...state.category, name: payload.category };
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    clearEditedValue({ commit }) {
      commit('clearDoneMessage');
      commit('initCategory');
    },
    confirmDeleteCategory({ commit }, categoryDetail) {
      commit('confirmDeleteCategory', categoryDetail);
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/categoryDetail'].deleteCategoryId}`,
      }).then(() => {
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    editCategory({ commit, rootGetters }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/category'].name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${rootGetters['categories/category'].id}`,
        data,
      }).then(res => {
        const payload = {
          category: {
            id: res.data.category.id,
            title: res.data.category.name,
          },
        };
        commit('doneEditCategory', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
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
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res => {
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
          },
        };
        commit('doneGetCategory', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategories({ commit, rootGetters }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/category'].name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        const payload = res.data.category;
        commit('addCategory', payload);
        commit('initCategory');
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, category) {
      commit({
        type: 'updateValue',
        category,
      });
    },
  },
};
