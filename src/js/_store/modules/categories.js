import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    category: {
      id: null,
      name: '',
    },
    roleList: [],
    categories: [],
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categories = [...payload.categories];
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
  },
  actions: {
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        const payload = {
          categories: response.data.categories.reverse(),
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
