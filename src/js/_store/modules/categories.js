import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryName: '',
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
    editedCategoryTitle(state, payload) {
      state.categoriesList = { ...state.categoriesList, title: payload.categoryName };
    },
    updateCategory(state, { category }) {
      state.categoryList = { ...state.categoryList, ...category };
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
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
      }).catch(err => {
        commit('failDelete', err);
      });
    },
    editedCategoryTitle({ commit }, categoryName) {
      commit({
        type: 'editedTitle',
        categoryName,
      });
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      // state.append('id', rootGetters['categories/categoryList'].id);
      // state.append('title', rootGetters['categories/categoryList'].categoryName);
      // state.append('category_id', rootGetters['categories/categoryList'].category.id);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${rootGetters['categories/categoryList'].id}`,
      }).then(() => {
        commit('updateCategory');
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
  },
};
