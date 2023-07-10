import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoriesList: [],
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
      state.categoriesList = state.categoriesList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      console.log(state.errorMessage);
    },
    updateValue(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    updateCategory(state, payload) {
      state.categoriesList = [payload.newCategories.category, ...state.categoriesList];
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      commit('clearMessage');
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
    updateValue({ commit }, name) {
      commit({
        type: 'updateValue',
        name,
      });
    },
    postCategory({ commit, state, rootGetters }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: { name: state.targetCategory.name },
      }).then(res => {
        const payload = {
          newCategories: res.data,
        };
        commit('updateCategory', payload);
        commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
      }).catch(err => {
        console.log(err);
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
