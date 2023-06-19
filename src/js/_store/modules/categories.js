import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: {
      id: null,
      name: '',
    },
    categoryList: [
      {
        id: 1,
        name: 'aaa',
      },
    ],
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },

  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      });
    },
  },
};
