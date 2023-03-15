import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryName: '',
    categoriesList: [],
    categoryList: {},
    categoryId: '',
    categoryTitle: '',
    deleteCategoryId: null,
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    getCategoryTitle(state, res) {
      state.categoryTitle = res;
    },
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
    editedCategoryTitle(state, payload) {
      // カテゴリーを変更する payload.titleに変更したカテゴリー名が入る
      state.categoryTitle = payload.title;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    // 対象のカテゴリー名を取得するAPI通信する関数を作る
    getCategoryTitle({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res => {
        commit('getCategoryTitle', res.data.category.name);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({
      commit,
      rootGetters,
      state,
      dispatch,
    }, categoryId) {
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${categoryId}`,
        data: {
          name: state.categoryTitle,
        },
      }).then(() => {
        dispatch('getCategoryTitle', categoryId);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
    editedCategoryTitle({ commit }, title) {
      commit({
        type: 'editedCategoryTitle',
        title,
      });
    },
    getAllLists({ commit, rootGetters }) {
      commit('clearMessage');
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
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
      }).catch(err => {
        commit('failDelete', err);
      });
    },
  },
};
