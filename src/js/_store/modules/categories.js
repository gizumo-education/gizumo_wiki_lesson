import axios from '@Helpers/axiosDefault';

export default {
  
  state: {
    namespaced: true,
    categoryList: [],
  },
  getters: {
    
  },
  mutaions: {
    // doneFilteredCategories(state, payload) {
    //   const filteredCategories = payload.categories.filter(
    //     category => category.category && category.category.name === payload.category,
    //   );
    //   state.categoryList = [...filteredCategories];
    // },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    filteredCategories({ commit, rootGetters }, category) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/category',
        }).then(res => {
          const payload = {
            category,
            articles: res.data.categories,
          };
          commit('doneFilteredCategories', payload);
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject(new Error('エラーが発生しました'));
        });
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        console.log(res);
        const payload = {
        categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload.id);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
}