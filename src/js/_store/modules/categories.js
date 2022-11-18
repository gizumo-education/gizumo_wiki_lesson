import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    categoryList: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
    },
    confirmDeleteCategory(state, { id, name }) {
      state.deleteCategoryId = id;
      state.deleteCategoryName = name;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        commit('doneGetAllCategories', res.data.categories.reverse());
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    postCategory({ commit, rootGetters }, name) {
      return new Promise(resolve => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: name,
        }).then(() => {
          commit('displayDoneMessage', { message: '成功しました' });
          commit('toggleLoading');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    confirmDeleteCategory({ commit }, { id, name }) {
      commit('confirmDeleteCategory', { id, name });
    },
    deleteCategory({ commit, rootGetters }, { id }) {
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${id}`,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリー削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
