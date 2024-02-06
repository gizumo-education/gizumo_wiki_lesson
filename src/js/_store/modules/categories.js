import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      id: null,
      name: '',
    },
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categoryList = [...payload.categories].reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    editedCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    // 一覧取得するアクションを定義する（中身の処理は不要）
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      })
      // 成功したら
        .then(res => {
          const payload = {
            categories: res.data.categories,
          };
          commit('doneGetCategories', payload);
        })
      // 失敗したら
        .catch(err => {
          commit('failRequest', { message: err.message });
        });
    },
    // カテゴリ名入力のアクション定義
    editedCategory({ commit }, name) {
      commit({
        type: 'editedCategory',
        name,
      });
    },

    // ３作成ボタン押下アクション
    postCategories({ commit, rootGetters }) {
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/targetCategory'].name);
      return new Promise((resolve, reject) => {
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          resolve();
          commit('toggleLoading');
          commit('editedCategory', { name: '' });
          commit('displayDoneMessage', { message: 'カテゴリを作成しました' });
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
