import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
    loading: false,
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
  },
};
