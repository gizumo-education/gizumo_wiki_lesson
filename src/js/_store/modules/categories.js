import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories.reverse()];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, doneMessage = { message: '成功しました' }) {
      state.doneMessage = doneMessage.message;
    },
  },
  actions: {
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
    postCategory({ commit, rootGetters }, doneMessage) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', doneMessage);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('clearMessage');
          commit('toggleLoading');
          commit('displayDoneMessage', { message: '新規カテゴリーを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
