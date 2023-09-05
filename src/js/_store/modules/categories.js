import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  mutations: {
    // category: {
    //   id: null,
    //   name: '',
    // },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/categories',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);

        const categories = response.data.categories.map(data => ({
          id: data.id,
          fullName: data.full_name,
          accountName: data.account_name,
          email: data.email,
          role: data.role,
        }));
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};