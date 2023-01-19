import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    errorMessage: '',
    doneMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
      state.categoriesList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    postCategory(state, payload) {
      state.categoriesList.unshift(payload);
    },
    clearMessage(state) {
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload;
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
    postCategory({ commit, rootGetters }, inputName) {
      const data = new URLSearchParams();
      data.append('name', inputName);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        console.log(res); //eslint-disable-line
        const resName = {
          name: res.data.category.name,
          id: res.data.category.id,
        };
        commit('postCategory', resName);
        const messageDone = '完了しました';
        commit('displayDoneMessage', messageDone);
        this.$store.dispatch('doneGetAllCategories');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
