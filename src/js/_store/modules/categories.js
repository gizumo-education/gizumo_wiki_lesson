import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      category: {
        name: '',
      },
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
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
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    displayErrorMessage(state, payload = { message: '失敗しました' }) {
      state.doneMessage = payload.message;
    },
    updateValue(state, payload) {
      state.targetCategory.category.name = payload.category;
    },
    newCategory(state, payload) {
      state.categoryList.unshift(payload);
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
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory'].category.name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(res => {
          commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
          commit('newCategory', res.data.category);
          return resolve();
        }).catch(() => {
          commit('displayErrorMessage', { message: 'カテゴリー取得に失敗しました' });
          return reject();
        });
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
