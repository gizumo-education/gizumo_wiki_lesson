import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    theads: ['カテゴリー名'],
    errorMessage: '',
    id: null,
    title: '',
    content: '',
    category: {
      id: null,
      name: '',
    },
    categoriesList: [],
    doneMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
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
  },
};
