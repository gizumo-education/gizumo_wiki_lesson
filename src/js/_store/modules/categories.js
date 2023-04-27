import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: '',
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
        commit('clearMessage');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({ commit, rootGetters }, categoryName) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: categoryName,
        },
      }).then(() => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/category',
        }).then(res => {
          const categories = res.data.categories.reverse();
          commit('setCategories', { categories });
          commit('clearMessage');
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
        commit('clearMessage');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
