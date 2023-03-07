import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    doneMessage: '',
    errorMessage: '',
    category: '',
    categories: [],
    selectedCategory: {},
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
    cleanValue(state) {
      state.category = '';
    },
    updateValue(state, payload) {
      state.category = payload;
    },
    selectCategory(state, payload) {
      state.selectedCategory = { ...payload };
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
          commit('cleanValue');
        })
        .catch(err => {
          commit('failRequest', err);
        });
    },
    selectCategory({ commit }, payload) {
      commit('selectCategory', payload);
    },
    deleteCategory({
      commit, state, rootGetters, dispatch,
    }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${state.selectedCategory.id}`,
      })
        .then(res => {
          dispatch('getAllCategories');
          if (res) commit('successRequest', `カテゴリーを削除しました（${res.data.category.name}）`);
        })
        .catch(err => {
          commit('failRequest', err);
        });
    },
  },
};
