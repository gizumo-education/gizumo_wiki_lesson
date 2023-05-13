import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    newCategory: '',
  },
  mutations: {
    addCategory(state, category) {
      state.newCategory = category;
    },
    doneGetCategories(state, categoriesList) {
      state.categories = [...categoriesList.reverse()];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },

  },
  getters: {
    targetCategory: state => state.newCategory,
  },
  actions: {
    addCategory({ commit }, category) {
      commit('addCategory', category);
    },
    createCategory({ commit, rootGetters }) {
      const data = {
        name: rootGetters['categories/targetCategory'],
      };
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(({data}) => {
        console.log(data);
      });
    },
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const categoriesList = res.data.categories;
        commit('doneGetCategories', categoriesList);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
