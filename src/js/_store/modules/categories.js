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
    disabled: false,
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
    },
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories];
      state.categoriesList = state.categoriesList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
    toggleDisabled(state) {
      state.disabled = !state.disabled;
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
      commit('toggleDisabled');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: { name: state.targetCategory.name },
      }).then(res => {
        const payload = {
          newCategories: res.data,
        };
        commit('updateCategory', payload);
        commit('toggleDisabled');
        commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
        commit('initPostCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
