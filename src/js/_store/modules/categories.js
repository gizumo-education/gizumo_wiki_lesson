import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    doneMessage: '',
    errorMessage: '',
    category: '',
    categories: [],
  },
  getters: {},
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categories = [...payload.categories.reverse()];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    updateValue() {
      console.log('updateValue called');
    },
    handleSubmit() {
      console.log('handleSubmit called');
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      })
        .then(res => {
          const payload = { categories: res.data.categories };
          commit('doneGetAllCategories', payload);
        })
        .catch(err => {
          commit('failRequest', { message: err.message });
        });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    updateValue({ commit }) {
      commit('updateValue');
    },
    handleSubmit({ commit }) {
      commit('handleSubmit');
    },
  },
};
