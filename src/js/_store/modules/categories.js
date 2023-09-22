import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList;
    },
    getCategory(state) {
      return state.category.name;
    },
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      return state.categoryList.reverse();
    },
    editedCategory(state, category) {
      state.category.name = category;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneEditCategory(state, { name }) {
      state.categoryList = { ...state.category, ...name };
      state.loading = false;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
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
    editedCategory({ commit }, category) {
      commit('editedCategory', category);
    },
    updateCategory({ commit, rootGetters, state }) {
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', state.category.name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('clearMessage');
          commit('toggleLoading');
          this.$store.dispatch('getAllCategories');
          commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
