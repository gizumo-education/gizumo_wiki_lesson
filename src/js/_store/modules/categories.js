import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    setCategories(state, { categories }) {
      state.categoriesList = categories;
    },
    doneCreateCategory(state) {
      state.doneMessage = '新しいカテゴリーが作成されました。';
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getCategoryList({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const categories = res.data.categories.reverse();
        commit('setCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    addCategory({ commit, rootGetters, dispatch }, categoryName) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: categoryName,
        },
      }).then(() => {
        dispatch('getCategoryList');
        commit('doneCreateCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
