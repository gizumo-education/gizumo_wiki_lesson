import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    doneMessage: '',
    isLoading: false,
  },
  mutations: {
    allCategories(state, payload) {
      state.categories = payload;
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    doneMessage(state, { message }) {
      state.doneMessage = message;
    },
    errorMessage(state, message) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
  },
  actions: {
    allCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(data => {
        const categoryList = data.data.categories.reverse();
        commit('allCategories', categoryList);
      }).catch(err => {
        const errroMesssage = err.message;
        commit('errorMessage', errroMesssage);
      });
    },
    createCategory({ commit, rootGetters }, targetCategory) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: {
            name: targetCategory,
          },
        }).then(() => {
          commit('toggleLoading');
          commit('doneMessage', { message: 'カテゴリー名を登録しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('errorMessage', err.message);
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
