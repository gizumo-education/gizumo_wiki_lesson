import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
    loading: false,
    deleteCategoryId: null,
    category: {
      id: '',
      name: '',
    },
  },
  mutations: {
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    createCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    confirmDeleteCategory(state, { categoryId }) {
      state.deleteCategoryId = categoryId;
    },
    editedCategory(state, name) {
      state.category.name = name;
    },
    doneGetCategory(state, category) {
      state.category = category;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const categories = response.data.categories.reverse();
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }, targetCategoryName) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', targetCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        commit('toggleLoading');
        const responseCategory = {
          name: response.data.category.name,
          id: response.data.category.id,
        };
        commit('createCategory', responseCategory);
        commit('displayDoneMessage', { message: '新規カテゴリーの追加が完了しました。' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
        commit('toggleLoading');
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, categoryId) {
      commit('confirmDeleteCategory', { categoryId });
    },
    deleteCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    editedCategory({ commit }, name) {
      commit('editedCategory', name);
    },
    updateCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.category.id}`,
        data: state.category,
      }).then(() => {
        commit('displayDoneMessage', { message: 'カテゴリー名を変更しました' });
        commit('toggleLoading');
      }).catch(err => {
        commit('failRequest', { message: err.message });
        commit('toggleLoading');
      });
    },
    getTargetCategory({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(res => {
        commit('doneGetCategory', res.data.category);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
