import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    deleteItemsList: [],
  },
  mutations: {
    doneGetAllDeleteItems(state, payload) {
      state.deleteItemsList = payload.articles;
    },
  },
  actions: {
    getAllDeleteItems({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/article/trashed',
      })
        .then((res) => {
          const payload = {
            articles: res.data.articles.reverse(),
          };
          commit('doneGetAllDeleteItems', payload);
        })
        .catch((err) => {
          commit('failRequest', { message: err.message });
        });
    },
  },
};
