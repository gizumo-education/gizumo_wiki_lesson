import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    addCategory(state, category) {
      state.categoryList.unshift(category);
    },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload.categories };
    },
    doneAllCategories(state, payload) {
      state.categoryList = [...payload.categories].reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    errorMessage(state, message) {
      state.errorMessage = message;
    },
    loading(state) {
      state.loading = !state.loading;
    },
    doneMessage(state, message) {
      state.doneMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    createCategory({ commit, rootGetters }, categoryName) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('name', categoryName);
      return axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        const createdCategory = response.data.category;
        commit('addCategory', createdCategory);
        commit('doneMessage', 'カテゴリー名一覧に追加成功');
      }).catch(() => {
        commit('errorMessage', '追加失敗');
      }).finally(() => {
        commit('loading');
      });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
