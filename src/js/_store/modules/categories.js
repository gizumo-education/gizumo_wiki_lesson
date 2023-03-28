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
    deleteCategoryName: '',
    deleteCategoryId: null,
    doneMessage: '',
    disabled: false,
  },
  getters: {
    category: state => state.category,
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    addCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
    clearMessage(state) {
      state.errorMessage = '';
    },
    confirmDeleteCategory(state, categoryDetail) {
      const categoryId = categoryDetail[0];
      const categoryName = categoryDetail[1];
      state.deleteCategoryName = categoryName;
      state.deleteCategoryId = categoryId;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
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
    confirmDeleteCategory({ commit }, categoryDetail) {
      commit('confirmDeleteCategory', categoryDetail);
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/deleteCategoryId']);
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        data,
      }).then(() => {
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
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
