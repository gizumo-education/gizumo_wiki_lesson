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
    editedCategory(state, payload) {
      state.category = { ...state.category.name, name: payload.name };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    updateArticle(state, { category }) {
      state.category = { ...state.category, ...category };
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updateCategory(state, { article }) {
      state.targetArticle = { ...state.targetArticle, ...article };
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
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
      commit({
        type: 'editedCategory',
        category,
      });
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/category'].id);
      data.append('title', rootGetters['categories/category'].name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/categories/${rootGetters['categories/category'].id}`,
        data,
      }).then(res => {
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.title,
          },
        };
        commit('updateCategory', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'ドキュメントを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
  },
};
