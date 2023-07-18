import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categories: [],
    targetCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, payload) {
      state.categories = [...payload.categories.reverse()];
      state.loading = false;
    },
    donePostCategory(state, payload) {
      state.categories.unshift(payload.category);
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updateCategoryName(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    updateCategoryName({ commit }, name) {
      commit({
        type: 'updateCategoryName',
        name,
      });
    },
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        const payload = {
          categories: response.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // 新規カテゴリー作成
    postArticle({ commit, rootGetters, state }) {
      const data = new URLSearchParams();
      data.append('name', state.targetCategory.name);
      data.append('user_id', rootGetters['auth/user'].id);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        const payload = {
          category: response.data.category,
        };
        commit('donePostCategory', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
