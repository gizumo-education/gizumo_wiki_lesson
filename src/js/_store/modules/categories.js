import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    doneMessage: '',
    newCategoryName: '',
    isLoading: false,
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
    setCategories(state, categories) {
      state.categories = categories.reverse();
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
