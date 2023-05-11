import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categories = [...payload];
    },
  },
  actions: {
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = res.data.categories;
        commit('doneGetCategories', payload);
      });
    },
  },
};
