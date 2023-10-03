import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
    deleteCategory: { // 削除するカテゴリーを管理するstate
      id: null,
      name: '',
    },
  },
  getters: {
    deleteCategory: state => state.deleteCategory,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategory.id = categoryId;
      state.deleteCategory.name = categoryName;
      // 削除するカテゴリーの情報をstateに保存
    },
  },
  actions: {
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories.reverse(),
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters, dispatch }, categoryName) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          dispatch('getAllCategories');
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
      // mutationのconfirmDeleteCategoryを呼び出す
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/deleteCategory'].id);
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategory'].id}`,
        data,
      }).then(() => {
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
        dispatch('getAllCategories');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
      // 削除するカテゴリーのidをstateから参照してaxiosでDELETEリクエストを送る
    },
  },
};
