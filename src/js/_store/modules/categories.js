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
    deleteCategoryName: null,
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryName: state => state.deleteCategory.name,
    deleteCategoryId: state => state.deleteCategory.id,
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categoryList = [...payload.categories].reverse();
    },
    doneDeleteCategory(state) {
      state.deleteCategory = {
        id: null,
        name: '',
      };
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategory = {
        id: categoryId,
        name: categoryName,
      };
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
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        }).then(() => {
          resolve();
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
        }).catch(err => {
          reject();
          commit('failRequest', { message: err.message });
        });
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
