import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    targetCategories: '',
    errorMessage: '',
    doneMessage: '',
    isLoading: false,
  },
  getters: {
    targetCategories: state => state.targetCategories,
  },
  mutations: {
    allCategories(state, payload) {
      state.categories = payload;
    },
    addTargetCategories(state, name) {
      state.targetCategories = name;
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    doneMessage(state) {
      state.doneMessage = 'カテゴリー名を登録しました';
    },
    errorRequest(state, message) {
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
        commit('errorRequest', errroMesssage);
      });
    },
    addTargetCategories({ commit }, name) {
      commit('addTargetCategories', name);
    },
    createCategory({ commit, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategories']);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('doneMessage');
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('errorRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
