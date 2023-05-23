import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    category: {
      id: null,
      name: '',
    },
    value: '',
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    resetMessage(state) {
      state.category.id = '';
      state.category.name = '';
      state.value = '';
    },
    updateValue(state, target) {
      state.category.name = target;
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
      return new Promise((resolve, reject) => {
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
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
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
