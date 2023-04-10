import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      name: '',
      id: 'null',
    },
    disabled: false,
    errorMessage: '',
    errorMessagePost: '',
    doneMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload];
    },
    donePostCategories(state, { payload }) {
      state.categoryList.unshft(payload);
    },
    doneUpdateValue(state, payload) {
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
      state.errorMessage = '';
      state.errorMessagePost = '';
    },
    displayDoneMessage(state, { message }) {
      state.doneMessage = message;
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
        commit('failRequest', { errorMessage: err.message });
      });
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
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました。' });
          resolve();
        }).catch(() => {
          commit('failRequest', { errorMessagePost: 'カテゴリー作成に失敗しました。' });
        }).finally(() => {
          commit('switchDisabled');
          commit('clearTargetCategory');
        });
      });
    },
    updateValue({ commit }, targetCategory) {
      const payload = targetCategory;
      commit('doneUpdateValue', payload);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
