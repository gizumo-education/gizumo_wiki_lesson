import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categories: [],
    errorMessage: '',
    targetCategory: '',
    disabled: false,
    doneMessage: '',
  },
  mutations: {
    addCategory(state, addCategory) {
      state.categories.unshift(addCategory);
    },
    setTargetCategory(state, category) {
      state.targetCategory = category;
    },
    doneGetCategories(state, categoriesList) {
      state.categories = [...categoriesList.reverse()];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
    clearTargetInput(state) {
      state.targetCategory = '';
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  actions: {
    setTargetCategory({ commit }, category) {
      commit('setTargetCategory', category);
    },
    addCategory({ commit, rootGetters }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = {
        name: rootGetters['categories/targetCategory'],
      };
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        commit('toggleLoading');
        const addedCategory = res.data.category;
        commit('addCategory', addedCategory);
        commit('clearTargetInput');
        commit('displayDoneMessage', { message: 'カテゴリーを追加しました' });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const categoriesList = res.data.categories;
        commit('doneGetCategories', categoriesList);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
