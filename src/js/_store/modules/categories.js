import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categories: [],
    errormessage: '',
  },
  mutations: {
    AllCategories(state, payload) {
      state.categories = payload;
    },
    ErrorRequest(state, message) {
      state.errormessage = message;
    },
  },
  actions: {
    AllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(data => {
        const categoryList = data.data.categories.reverse();
        commit('AllCategories', categoryList);
      }).catch(err => {
        const errroMesssage = err.message;
        commit('ErrorRequest', errroMesssage);
      });
    },
  },
};
