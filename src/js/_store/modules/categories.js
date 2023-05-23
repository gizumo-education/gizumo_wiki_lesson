import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: '',
    categoryList: [],
    disabled: false,
    errorMessage: '',
    doneMessage: '',
  },
  mutations: {
    initTargetCategory(state) {
      state.targetCategory = '';
    },
    resetMessage(state) {
      state.targetCategory = '';
    },
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    updateCategory(state, payload) {
      state.targetCategory = payload;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.disabled = !state.disabled;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
    categoryList: state => state.categoryList,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    initTargetCategory({ commit }) {
      commit('initTargetCategory');
    },
    resetMessage({ commit }) {
      commit('resetMessage');
    },
    updatedCategory({ commit }, category) {
      commit('updateCategory', category);
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(({ data }) => {
        commit('doneGetAllCategories', data.categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },

    addCategory({ commit, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');

        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory']);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('resetMessage');
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
