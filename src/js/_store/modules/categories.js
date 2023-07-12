import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    creatingCategory: false,
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    addCategory(state, category) {
      state.categories.unshift(category);
    },
  },
  actions: {
    fetchCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const { categories } = res.data;
        commit('setCategories', categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit }, { token, data }) {
      return new Promise((resolve, reject) => {
        axios(token)
          .post('/category', data)
          .then(response => {
            const createdCategory = response.data.category;
            commit('addCategory', createdCategory);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  },
};
