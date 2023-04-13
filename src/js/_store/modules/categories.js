import axios from '@Helpers/axiosDefault';
// import { actions } from '@storybook/addon-actions';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteArticleId: state => state.deleteArticleId,
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    mutateCategories(state, payload) {
      // console.log(payload.categories);
      state.categoryList = payload.categories;
      // console.log(state.categoryList);
    },
    initPostCategory(state) {
      state.targetCategory = {
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
  },
  actions: {
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        // console.log(res);
        // resで受け取ったデータから「categories」(一覧)を取得
        const payload = {
          categories: res.data.categories,
        };
        commit('mutateCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
  },
};
