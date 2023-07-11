import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    async fetchCategories({ commit, getters }) {
      try {
        const token = getters['auth/token'];

        const response = await axios(token).get('/category');
        const { categories } = response.data;
        categories.reverse();

        commit('SET_CATEGORIES', categories);
      } catch (error) {
        commit('failRequest', { message: 'カテゴリ一覧の取得中にエラーが発生しました' });
      }
    },
  },
};
