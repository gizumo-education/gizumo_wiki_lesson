import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
    deleteCategoryName: null,
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList;
    },
    getCategory(state) {
      return state.category.name;
    },
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      return state.categoryList.reverse();
    },
    editedCategory(state, category) {
      state.category.name = category;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneEditCategory(state, { name }) {
      state.categoryList = { ...state.category, ...name };
      state.loading = false;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    deletePostName(state) {
      state.category.name = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    confirmDeleteCategory(state, { categoryName }) {
      console.log(categoryName);
      state.deleteCategoryName = categoryName;
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
    editedCategory({ commit }, category) {
      commit('editedCategory', category);
    },
    postCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', state.category.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(() => {
        commit('clearMessage');
        this.dispatch('categories/getAllCategories');
        commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
        commit('deletePostName');
        commit('toggleLoading');
      }).catch(err => {
        commit('startLoading');
        commit('failRequest', { message: err.message });
        commit('toggleLoading');
      });
    },
    confirmDeleteCategory({ commit }, categoryName) {
      commit('confirmDeleteCategory', { categoryName });
    },
  },
};
