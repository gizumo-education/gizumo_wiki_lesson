import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    errorMessage: '',
    doneMessage: '',
    disabled: false,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
      state.categoriesList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    postCategory(state, payload) {
      state.categoriesList.unshift(payload);
    },
    errorMessage(state, payload) {
      state.errorMessage = payload.message;
    },
    clearMessage(state) {
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    disabled(state) {
      state.disabled = !state.disabled;
    },
  },
  actions: {
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
    postCategory({ dispatch, commit, rootGetters }, inputName) {
      const data = new URLSearchParams();
      data.append('name', inputName);
      commit('disabled');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        const resName = {
          name: res.data.category.name,
          id: res.data.category.id,
        };
        commit('postCategory', resName);
        commit('displayDoneMessage', { message: 'カテゴリー名作成完了しました。' });
        dispatch('getAllCategories');
        setTimeout(() => {
          commit('displayDoneMessage', { message: '' });
        }, 3000);
        commit('disabled');
      }).catch(err => {
        commit('errorMessage', { message: err.message });
        commit('disabled');
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
