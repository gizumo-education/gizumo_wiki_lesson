import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    newCategoryName: '',
    creatingCategory: false,
    successMessage: '',
  },
  mutations: {
    setSuccessMessage(state, message) {
      state.successMessage = message;
    },
    setErrorMessage(state, message) {
      state.errorMessage = message;
    },
    clearMessages(state) {
      state.successMessage = '';
      state.errorMessage = '';
    },
    setCategories(state, categories) {
      state.categories = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    addCategory(state, category) {
      state.categories.unshift(category);
    },
    setCreatingCategory(state, value) {
      state.creatingCategory = value;
    },
  },
  actions: {
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
      const data = {
        name: categoryName,
      };
      return axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        const createdCategory = response.data.category;
        commit('addCategory', createdCategory);
        commit('setSuccessMessage', 'カテゴリ追加に成功！');
      }).catch(() => {
        commit('setErrorMessage', 'カテゴリ追加に失敗！');
      });
    },
  },
};
