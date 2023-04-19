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
    doneMessage: '',
    disabled: false,
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
    toggleDisable(state) {
      state.disabled = !state.disabled;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    clearUpdateName(state) {
      state.updateName = { id: 'null', name: '' };
    },
    doneMessage(state, { message }) {
      state.doneMessage = message;
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
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleDisable');
        const data = state.updateName;
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          dispatch('getAllCategories');
          commit('clearUpdateName');
          commit('clearMessage');
          commit('doneMessage', { message: 'カテゴリーの追加に成功しました' });
          resolve();
        }).then(() => {
          commit('toggleDisable');
        }).catch(err => {
          commit('toggleDisable');
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
