import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    CategoriesList: [],
  },
  mutations: {
    getAllLists(state, res) {
      // console.log(res);
      state.CategoriesList = res.articles;
    },
  },
  actions: {
    getAllLists({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          articles: res.data.categories,
        };
        commit('getAllLists', payload);
        // console.log(res);
      }).catch(err => {
        commit('getAllLists', { message: err.message });
      });
    },
  },
};
