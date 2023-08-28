import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      category: {
        name: '',
      },
    },
    categoryList: [''],
    errorMessage: '',
    doneMessage: '',
    loading: false,
  },
  getters: {
    targetCategory: state => state.targetCategory,
    categoryList: state => state.categoryList,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    editedCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, category: payload.category.name };
    },
    updateValue(state, payload) {
      state.targetCategory.category.name = payload.category;
    },
  },
  actions: {
    updateValue({ commit }, categoryName) {
      const name = categoryName;
      const payload = {
        category: name,
      };
      commit('updateValue', payload);
    },
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory'].category.name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
          window.location.reload(false);
          return resolve();
        }).catch(() => {
          commit('toggleLoading');
          return reject();
        });
      });
    },
    editedCategory({ commit }, category) {
      commit({
        type: 'editedCategory',
        category,
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
