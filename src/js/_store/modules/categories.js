import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    category: state => state.category,
  },
  mutations: {

    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    updateCategory(state, payload) {
      state.category = { ...state.category, name: payload.name };
    },
    donePostCategory(state, payload) {
      state.doneMessage = '新規カテゴリの追加が完了しました。';
      state.categoryList.unshift(payload);
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    initCategory(state) {
      state.category = {
        id: null,
        name: '',
      };
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', categories);
      });
    },
    initCategory({ commit }) {
      commit('initCategory');
    },
    updateCategory({ commit }, name) {
      commit({
        type: 'updateCategory',
        name,
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    postCategory({ commit, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/category'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          const postCategory = response.data.category;
          commit('initCategory');
          commit('toggleLoading');
          commit('donePostCategory', postCategory);
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          if (err.data) {
            commit('failRequest', { message: err.response.data.message });
          } else {
            commit('failRequest', { message: 'ネットに接続がされていないかサーバーとの接続がされていません。ご確認ください。' });
          }
        });
      });
    },
  },
};
