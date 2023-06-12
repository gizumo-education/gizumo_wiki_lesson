import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
      state.categoryList.reverse();
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    updateValue(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    initTargetCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
    },
    donePostCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
    confirmDeleteCategory(state, deleteCategory) {
      state.deleteCategoryId = deleteCategory.categoryId;
      state.deleteCategoryName = deleteCategory.categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);

        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, name) {
      commit({ type: 'updateValue', name });
    },
    postCategory({ commit, rootGetters }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/targetCategory'].name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        commit('donePostCategory', response.data.category);
        commit('initTargetCategory');
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, deleteCategory) {
      commit('confirmDeleteCategory', deleteCategory);
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        const data = new URLSearchParams();
        data.append('id', rootGetters['categories/deleteCategoryId']);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
          data,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
