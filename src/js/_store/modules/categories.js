import axios from '@Helpers/axiosDefault';

export default {
  state: {
    namespaced: true,
    category: '',
    errorMessage: '',
    doneMessage: '',
    disabled: '',
    categoryList: [],
  },
  getters: {
    
  },
  mutations: {
    initPostCategory(state) {
      state.targetArticle = {
        id: null,
        title: '',
        content: '',
        category: {
          id: null,
          name: '',
        },
        user: {
          account_name: '',
          created_at: '',
          email: '',
          full_name: '',
          id: '',
          password_reset_flg: null,
          role: '',
          updated_at: '',
        },
      };
    },
    doneGetAllCategories(state, payload) {
      console.log('category payload')
      console.log(payload)
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
      namespaced: true,
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        console.log(res);
        const payload = {
        categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
        // console.log(payload)
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
}