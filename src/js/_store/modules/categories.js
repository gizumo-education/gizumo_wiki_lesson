import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      name: '',
      id: null,
    },
    disabled: false,
    categoryList: [],
    doneMessage: '',
    errorMessage: '',
    errorMessagePost: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload];
    },
    updateValue(state, payload) {
      state.targetCategory.name = payload;
    },
    clearTargetCategory(state) {
      state.targetCategory = {
        name: '',
        id: 'null',
      };
    },
    switchDisabled(state) {
      state.disabled = !state.disabled;
    },
    failRequest(state, { errorMessage, errorMessagePost }) {
      state.errorMessage = errorMessage;
      state.errorMessagePost = errorMessagePost;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessagePost = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = res.data.categories.reverse();
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, targetCategory) {
      const payload = targetCategory;
      commit('updateValue', payload);
      commit('clearMessage');
    },
    postCategory({ commit, state, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('switchDisabled');
        const data = {
          name: state.targetCategory.name,
        };
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
          commit('clearTargetCategory');
        }).catch(() => {
          commit('failRequest', { errorMessagePost: '失敗しました' });
        }).finally(() => {
          commit('switchDisabled');
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
