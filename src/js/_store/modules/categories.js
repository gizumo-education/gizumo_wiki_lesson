import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      category: {
        name: '',
      },
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
  },
  getters: {
    targetCategory: state => state.targetCategory,
    categoryList: state => state.categoryList,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.targetCategory.category.name = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    displayErrorMessage(state, payload = { message: '失敗しました' }) {
      state.doneMessage = payload.message;
    },
    updateValue(state, payload) {
      state.targetCategory.category.name = payload.category;
    },
    newCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    resetView(state, payload = { message: '' }) {
      state.doneMessage = payload.message;
      state.errorMessage = payload.message;
    },
  },
  actions: {
    resetView({ commit }) {
      commit('resetView', { message: null });
    },
    updateValue({ commit }, categoryName) {
      const name = categoryName;
      const payload = {
        category: name,
      };
      commit('updateValue', payload);
    },
    postCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/targetCategory'].category.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
        commit('newCategory', res.data.category);
        commit('toggleLoading');
        commit('clearMessage');
      }).catch(() => {
        commit('displayErrorMessage', { message: 'カテゴリー取得に失敗しました' });
        commit('toggleLoading');
        commit('clearMessage');
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
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
        this.state.targetCategory.category.name = '';
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
