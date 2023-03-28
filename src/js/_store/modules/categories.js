import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    targetCategory: {
      id: null,
      name: '',
    },
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
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
      state.categoryList = [...payload.categories];
      state.categoryList = state.categoryList.reverse();
    },
    newAddCategory(state, payload) {
      state.loading = false;
      state.categoryList.unshift(payload);
      state.doneMessage = '新規ユーザーの追加が完了しました。';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategoryList({ commit, rootGetters }) {
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
    addCategory({ commit, rootGetters }, categoryName) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: { name: categoryName },
      }).then(response => {
        const payload = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('newAddCategory', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
