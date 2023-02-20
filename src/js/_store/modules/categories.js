import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
  },

  mutations: {
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (!response.data.categories) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
