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
    doneGetAllCategories(state, { categories }) {
      state.categories = categories.reverse();
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
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const categories = [];
        response.data.categories.forEach(data => {
          categories.push({
            id: data.id,
            name: data.name,
          });
        });
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
