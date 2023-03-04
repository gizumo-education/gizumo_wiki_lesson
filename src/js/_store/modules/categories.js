import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    doneMessage: '',
    errorMessage: '',
    category: '',
    categories: [],
  },
  getters: {},
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categories = payload;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    successRequest(state, payload) {
      state.doneMessage = payload;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    updateValue(state, payload) {
      state.category = payload;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      })
        .then(res => {
          const payload = res.data.categories.reverse();
          commit('doneGetAllCategories', payload);
        })
        .catch(err => {
          commit('failRequest', { message: err.message });
        });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    updateValue({ commit }, payload) {
      commit('updateValue', payload);
    },
    handleSubmit({
      commit, dispatch, state, rootGetters,
    }) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: { name: state.category },
      })
        .then(() => {
          dispatch('getAllCategories');
          commit('successRequest', '新カテゴリーを作成！');
        })
        .catch(err => {
          commit('failRequest', err);
        });
    },
  },
};
