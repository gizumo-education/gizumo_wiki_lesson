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
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategory.id,
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
      state.categoryList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
      state.deleteCategory = deleteCategory;
    },
    doneDeleteCategory(state) {
      state.deleteCategory = {
        id: null,
        name: '',
      };
    },
    doneGetCategory(state, category) {
      state.targetCategory = { ...state.targetCategory, ...category };
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
    getCategory({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);

        const category = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('doneGetCategory', category);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    editCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${category.id}`,
        data: category,
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
        commit('toggleLoading');
      });
    },
    confirmDeleteCategory({ commit }, deleteCategory) {
      commit('confirmDeleteCategory', deleteCategory);
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
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
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    clearInput({ commit }) {
      commit('initTargetCategory');
    },
  },
};
