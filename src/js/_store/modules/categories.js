import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    categoryName: '',
    category: {
      id: null,
      name: '',
    },
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    resetMessage(state) {
      state.categoryName = '';
    },
    updateValue(state, target) {
      state.categoryName = target;
    },
    editValue(state, payload) {
      state.category.name = payload;
    },
    doneCreateCategories(state, categories) {
      state.categoryList = categories;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    getCategory(state, category) {
      state.category.id = category.id;
      state.category.name = category.name;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    openDeleteModal(state, { categoryId, categoryName }) {
      state.deleteCategory.id = categoryId;
      state.deleteCategory.name = categoryName;
    },
    deleteCategory(state, categories) {
      state.categoryList = categories;
    },
    doneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    resetMessage({ commit }) {
      commit('resetMessage');
    },
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    editValue({ commit }, target) {
      commit('editValue', target);
    },
    createCategories({ commit, rootGetters }, category) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          commit('doneCreateCategories', response.categories);
          commit('doneMessage', { message: 'カテゴリーの作成が成功しました' });
          commit('toggleLoading');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        commit('doneGetAllCategories', data.categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    getCategory({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(res => {
        commit('getCategory', res.data.category);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    editCategory({ commit, rootGetters }, { id, name }) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('name', name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${id}`,
        data,
      }).then(() => {
        commit('doneMessage', { message: 'カテゴリーの更新が成功しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    openDeleteModal({ commit }, { categoryId, categoryName }) {
      commit('openDeleteModal', { categoryName, categoryId });
    },
    deleteCategory({ commit, rootGetters }, { id }) {
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${id}`,
        }).then(() => {
          commit('doneMessage', { message: 'カテゴリーの削除が成功しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
