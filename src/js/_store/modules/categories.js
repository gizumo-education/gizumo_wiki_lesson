import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    loading: false,
    errorMessage: '',
    doneMessage: '',
    deleteCategoryId: null,
    deleteCategoryName: '',
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
    setCreatedDoneMessage(state) {
      state.loading = false;
      state.doneMessage = '新規カテゴリーを作成しました。';
    },
    confirmDeleteCategory(state, { deleteCategory }) {
      state.deleteCategoryId = deleteCategory.id;
      state.deleteCategoryName = deleteCategory.name;
    },
    deleteCategory(state) {
      state.loading = false;
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
    },
    failRequest(state, { message }) {
      state.loading = false;
      state.errorMessage = message;
    },
  },
  actions: {
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
    createCategory({ commit, rootGetters }, name) {
      return new Promise(resolve => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: { name },
        }).then(() => {
          commit('setCreatedDoneMessage');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },
    confirmDeleteCategory({ commit }, deleteCategory) {
      commit('confirmDeleteCategory', { deleteCategory });
    },
    deleteCategory({ commit, rootGetters }, { id }) {
      return new Promise(resolve => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${id}`,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('deleteCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
