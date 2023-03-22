import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    targetCategory: {
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
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    applyRequest(state) {
      state.loading = true;
    },
    doneAddCategory(state, payload) {
      state.targetCategory.unshift(payload);
      state.doneMessage = '新規ユーザーの追加が完了しました。';
    },
  },
  actions: {
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
  },
  addCategory({ commit, rootGetters }, targetCategory) {
    commit('applyRequest');

    return new Promise(resolve => {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: targetCategory,
      }).then(response => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        commit('doneAddCategory');
        resolve();
      }).catch(err => {
        commit('failRequest', { message: err.response.data.message });
      });
    });
  },
};
