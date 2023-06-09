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

    applyRequest(state) {
      state.loading = true;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
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
      state.loading = false;
      state.doneMessage = '新規カテゴリの追加が完了しました。';
      state.categoryList.unshift(payload);
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
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
          commit('donePostCategory', postCategory);
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },
  },
};
