import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    theads: '',
    errorMessage: '',
    categoriesList: [],
    updateName: {
      id: 'null',
      name: '',
    },
    loading: false,
    doneMessage: '',
  },
  mutations: {
    updateCategory(state, payload) {
      state.updateName.name = payload;
    },
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    clearUpdateName(state) {
      state.updateName = '';
    },
    doneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories.reverse(),
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({ commit }, updateName) {
      const payload = updateName;
      commit('updateCategory', payload);
      commit('clearMessage');
    },
    postCategory({
      commit, rootGetters, state, dispatch,
    }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = state.updateName;
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          dispatch('getAllCategories');
          commit('toggleLoading');
          commit('clearUpdateName');
          commit('clearMessage');
          commit('doneMessage', { message: 'カテゴリーの追加に成功しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
