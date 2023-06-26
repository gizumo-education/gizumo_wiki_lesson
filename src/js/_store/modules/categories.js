import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategories: {
      name: '',
      id: null,
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
  },
  mutations: {
    initPostCategories(state) {
      state.targetCategories = {
        id: null,
        name: '',
      };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories.reverse()];
    },
    doneGetCategory(state, payload) {
      state.targetCategories = { ...payload };
      state.categoryList.unshift(payload);
    },
    failRequest(state, { message }) { state.errorMessage = message; },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    updateCategories(state, categoryName) {
      state.targetCategories = { ...state.targetCategories, ...categoryName };
    },
  },
  actions: {
    initPostCategories({ commit }) {
      commit('initPostCategories');
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
    postCategories({ commit, rootGetters, state }) {
      const data = { name: state.targetCategories.name };
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        commit('toggleLoading');
        commit('displayDoneMessage', {
          message: 'ドキュメントを作成しました',
        });
        commit('doneGetCategory', res.data.category);
        commit('initPostCategories');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategories({ commit }, payload) {
      const categoryName = {
        name: payload,
      };
      commit('categories/updateCategories', categoryName, { root: true });
    },
  },
};
