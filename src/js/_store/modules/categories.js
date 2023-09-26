import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
  },
  mutations: {
    // category: {
    //   id: null,
    //   name: '',
    // },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      console.log('test');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/categories',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        console.log(payload);
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
      console.log({ commit, rootGetters });
    },
  },
};