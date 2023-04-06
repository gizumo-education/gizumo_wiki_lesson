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
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    failRequest(state, { errorMessage }) {
      state.errorMessage = errorMessage;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
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
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = {
          name: state.targetCategory.name,
        };
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          commit('clearTargetCategory');
          commit('toggleLoading');
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('clearTargetCategory');
          commit('failRequest', { errorMessage: err.message });
          reject();
        });
      });
    },
    updateValue({ commit }, targetCategory) {
      const payload = targetCategory;
      commit('doneUpdateValue', payload);
    },
  },
};
