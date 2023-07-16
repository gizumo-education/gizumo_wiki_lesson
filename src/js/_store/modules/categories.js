import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    doneMessage: '',
    newCategoryName: '',
    isLoading: false,
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
  },
  mutations: {
    setDoneMessage(state, message) {
      state.doneMessage = message;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    clearMessages(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    setCategories(state, payload) {
      state.categories = payload.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    addCategory(state, category) {
      state.categories.unshift(category);
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    confirmDeleteCategory(state, { payload }) {
      state.deleteCategory.id = payload.categoryId;
      state.deleteCategory.name = payload.categoryName;
    },
  },
  actions: {
    confirmDeleteCategory({ commit }, payload) {
      commit('confirmDeleteCategory', { payload });
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessages');
        const data = parseInt(rootGetters['categories/deleteCategoryId'], 10);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
          data,
        }).then(() => {
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    fetchCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const { categories } = res.data;
        commit('setCategories', categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit, rootGetters }, categoryName) {
      commit('clearMessages');
      const data = new URLSearchParams();
      data.append('name', categoryName);
      return axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        const createdCategory = response.data.category;
        commit('addCategory', createdCategory);
        commit('setDoneMessage', 'カテゴリ追加に成功！');
      }).catch(() => {
        commit('setErrorMessage', 'カテゴリ追加に失敗！');
      }).finally(() => {
        commit('setIsLoading', false);
      });
    },
    clearMessages({ commit }) {
      commit('clearMessages');
    },
  },
};
