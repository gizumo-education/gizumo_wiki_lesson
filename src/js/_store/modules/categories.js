import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    doneMessage: '',
    errorMessage: '',
    category: '',
    categories: [],
    targetCategory: {},
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
      state.targetCategory = { ...payload };
    },
    inputTargetCategoryName(state, payload) {
      state.targetCategory.name = payload;
    },
    toggleIsLoading(state) {
      state.isLoading = !state.isLoading;
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
        url: `/category/${state.targetCategory.id}`,
      })
        .then(() => {
          dispatch('getAllCategories');
          commit('successRequest', 'カテゴリーを削除しました');
        })
        .catch(err => {
          commit('failRequest', err);
        });
    },
    getCategoryDetails({ commit, rootGetters }, payload) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${payload}`,
      })
        .then(res => {
          commit('selectCategory', res.data.category);
        })
        .catch(err => {
          commit('failRequest', err);
        });
    },
    inputTargetCategoryName({ commit }, payload) {
      commit('inputTargetCategoryName', payload);
    },
    updateTargetCategoryName({ commit, state, rootGetters }) {
      if (state.isLoading === true) return;
      commit('clearMessage');
      commit('toggleIsLoading');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.targetCategory.id}`,
        data: { name: state.targetCategory.name },
      })
        .then(() => {
          commit('successRequest', 'カテゴリー名を更新しました！');
          commit('toggleIsLoading');
        })
        .catch(err => {
          commit('failRequest', err);
          commit('toggleIsLoading');
        });
    },
  },
};
