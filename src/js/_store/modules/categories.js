import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    categoryName: '',
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    resetMessage(state) {
      state.categoryName = '';
    },
    updateValue(state, target) {
      state.categoryName = target;
    },
    doneCreateCategories(state, categories) {
      state.categoryList = categories;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    doneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    resetMessage({ commit }) {
      commit('resetMessage');
    },
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    createCategories({ commit, rootGetters }, category) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          commit('doneCreateCategories', response.categories);
          commit('doneMessage', { message: 'カテゴリーの作成が成功しました' });
          commit('toggleLoading');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        commit('doneGetAllCategories', data.categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
