import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    targetCategory: [{
      id: '',
      name: '',
    }],
    categoryList: [],
    // deleteCategoryId: null,
    // loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    // categoryListLength: state => state.categoryList.length,
  },
  mutations: {
    // initPostCategory(state) {
    //   state.targetCategory = {
    //     id: null,
    //     title: '',
    //     content: '',
    //     category: {
    //       id: null,
    //       name: '',
    //     },
    //   };
    // },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload.category };
    },
    // editedTitle(state, payload) {
    //   state.targetArticle = { ...state.targetArticle, title: payload.title };
    // },
    // editedContent(state, payload) {
    //   state.targetArticle = { ...state.targetArticle, content: payload.content };
    // },
    // doneFilteredArticles(state, payload) {
    //   const filteredArticles = payload.articles.filter(
    //     article => article.category && article.category.name === payload.category,
    //   );
    //   state.articleList = [...filteredArticles];
    // },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories;
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    // updateArticle(state, { article }) {
    //   state.targetArticle = { ...state.targetArticle, ...article };
    // },
    // confirmDeleteArticle(state, { articleId }) {
    //   state.deleteArticleId = articleId;
    // },
    // doneDeleteArticle(state) {
    //   state.deleteArticleId = null;
    // },
    // toggleLoading(state) {
    //   state.loading = !state.loading;
    // },
    // clearMessage(state) {
    //   state.doneMessage = '';
    //   state.errorMessage = '';
    // },
    // displayDoneMessage(state, payload = { message: '成功しました' }) {
    //   state.doneMessage = payload.message;
    // },
  },
  actions: {
    // initPostCategory({ commit }) {
    //   commit('initPostCategory');
    // },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        })).reverse();
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
      //   const payload = {
      //     categories: res.data.categories,
      //   };
      //   commit('doneGetAllCategories', payload);
      // }).catch(err => {
      //   commit('failRequest', { message: err.message });
      // });
    },
    // deleteArticle({ commit, rootGetters }) {
    //   commit('clearMessage');
    //   const data = new URLSearchParams();
    //   data.append('id', rootGetters['articles/deleteArticleId']);
    //   axios(rootGetters['auth/token'])({
    //     method: 'DELETE',
    //     url: `/article/${rootGetters['articles/deleteArticleId']}`,
    //     data,
    //   }).then(() => {
    //     commit('doneDeleteArticle');
    //     commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
    //   }).catch(err => {
    //     commit('failRequest', { message: err.message });
    //   });
    // },
    // postArticle({ commit, rootGetters }) {
    //   return new Promise((resolve, reject) => {
    //     commit('clearMessage');
    //     commit('toggleLoading');
    //     const data = new URLSearchParams();
    //     data.append('title', rootGetters['articles/targetArticle'].title);
    //     data.append('content', rootGetters['articles/targetArticle'].content);
    //     data.append('user_id', rootGetters['auth/user'].id);
    //     if (rootGetters['articles/targetArticle'].category.id !== null) {
    //       data.append('category_id', rootGetters['articles/targetArticle'].category.id);
    //     }
    //     axios(rootGetters['auth/token'])({
    //       method: 'POST',
    //       url: '/article',
    //       data,
    //     }).then(() => {
    //       commit('toggleLoading');
    //       commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
    //       resolve();
    //     }).catch(err => {
    //       commit('toggleLoading');
    //       commit('failRequest', { message: err.message });
    //       reject();
    //     });
    //   });
    // },
    // clearMessage({ commit }) {
    //   commit('clearMessage');
    // },
  },
};
