import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

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
    doneGetAllCategories(state, payload) {
      state.categoryList = { ...payload };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    selectedArticleCategory(state, payload) {
      state.targetArticle.category = {

        ...state.targetArticle.category,
        ...payload.category,
      };
    },
    updateArticle(state, { article }) {
      state.targetArticle = { ...state.targetArticle, ...article };
    },
    confirmDeleteArticle(state, { articleId }) {
      state.deleteArticleId = articleId;
    },
    doneDeleteArticle(state) {
      state.deleteArticleId = null;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    initPostArticle({ commit }) {
      commit('initPostArticle');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = res.data.categories.reverse();
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postArticle({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('title', rootGetters['articles/targetArticle'].title);
        data.append('content', rootGetters['articles/targetArticle'].content);
        data.append('user_id', rootGetters['auth/user'].id);
        if (rootGetters['articles/targetArticle'].category.id !== null) {
          data.append('category_id', rootGetters['articles/targetArticle'].category.id);
        }
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/article',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
