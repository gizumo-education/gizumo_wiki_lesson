import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    deleteCategoryId: null,
    loading: false,
    doneMessage: '',
    errorMessage: '',

  },
  mutations: {
    getAllLists(state, res) {
      state.categoriesList = res.categories.reverse();
    },
    postCategory(state, res) {
      state.categoryPost = res.categories;
    },
    successMessage(state) {
      state.doneMessage = 'カテゴリーが追加されました';
    },
    incompleteMessage(state) {
      state.errorMessage = 'カテゴリーが追加できませんでした';
    },
    failDelete(state) {
      state.errorMessage = 'カテゴリーを削除できませんでした';
    },
    changeLoading(state) {
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
    getAllLists({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('getAllLists', payload);
      }).catch(err => {
        commit('getAllLists', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters, dispatch }, categoryName) {
      commit('clearMessage');
      commit('changeLoading');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: categoryName,
        },
      }).then(res => {
        commit('changeLoading');
        commit('clearMessage');
        commit('successMessage');
        dispatch('getAllLists');
        const payload = {
          addCategory: res.data.categories,
        };
        commit('postCategory', payload);
      }).catch(err => {
        commit('changeLoading');
        commit('clearMessage');
        commit('incompleteMessage');
        commit('postCategory', { message: err.message });
      });
    },
    deleteCategory({ commit, rootGetters, dispatch }, categoryId) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${categoryId}`,
      }).then(() => {
        dispatch('getAllLists');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
      }).catch(err => {
        commit('failDelete', err);
      });
    },
  },
};
