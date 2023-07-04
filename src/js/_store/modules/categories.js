import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      title: '',
      content: '',
      category: {
        id: null,
        name: '',
      },
    },
    categoriesList: [],
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
      state.categoriesList = state.categoriesList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    updateValue(state, payload) {
      state.targetCategory = { ...state.targetCategory, title: payload.title };
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
    updateValue({ commit }, title) {
      commit({
        type: 'updateValue',
        title,
      });
    },
  },
};
