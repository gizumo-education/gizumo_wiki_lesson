import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
  },
  mutations: {
    getAllLists(state, res) {
      state.categoriesList = res.categories;
    },
  },
  actions: {
    getAllLists({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('getAllLists', payload);
      }).catch(err => {
        commit('getAllLists', { message: err.message });
      });
    },
  },
};
