import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
      category: {
        id: null,
        name: '',
      },
    },
    categoryList: [],
    loading: false,
    errorMessage: '',
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList.map(category => ({
        id: category.id,
        content: `${category.title}`,
      }));
    },
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
        category: {
          id: null,
          name: '',
        },
      };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
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
