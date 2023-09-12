import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      title: '',
      content: '',
      category: {
        id: null,
        name: '',
      },
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        title: '',
        content: '',
        category: {
          id: null,
          name: '',
        },
      };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    editedTitle(state, payload) {
      state.targetCategory = { ...state.targetCategory, title: payload.title };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
    editedTitle({ commit }, title) {
      commit({
        type: 'editedTitle',
        title,
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories.reverse(),
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters, dispatch }, categoryName) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成したやで' });
          dispatch('getAllCategories');
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
