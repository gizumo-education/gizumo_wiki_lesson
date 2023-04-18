import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    deleteArticleId: state => state.deleteArticleId,
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    mutateCategories(state, payload) {
      state.categoryList = payload.categories;
    },
  },
  actions: {
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        // resで受け取ったデータから「categories」(一覧)を取得
        const payload = {
          categories: res.data.categories,
        };
        commit('mutateCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
