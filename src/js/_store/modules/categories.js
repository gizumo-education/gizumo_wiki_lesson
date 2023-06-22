import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    loading: false,
    categoriesList: [],
    doneMessage: '',
    errorMessage: '',
    deleteCategory: {
      id: null,
      name: '',
    },
    editDetail: '',
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
    targetCategoryId: state => state.targetCategory.id,
    targetCategoryName: state => state.targetCategory.name,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoriesList = [...payload.categories.reverse()];
    },
    doneCreateCategory(state) {
      state.doneMessage = 'カテゴリーが作成されました。';
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    afterDoneClearMessage(state) {
      state.doneMessage = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearErrorMessage(state) {
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    setTargetDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategory.id = categoryId;
      state.deleteCategory.name = categoryName;
    },
    editDetail(state, category) {
      state.editDetail = category;
    },
    inputCategory(state, { name, value }) {
      state.targetCategory = { ...state.targetCategory, [name]: value };
      state.editDetail = value;
    },
    updateCategory(state) {
      state.targetCategory = '';
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit, rootGetters, dispatch }, categoryName) {
      return new Promise(resolve => {
        const data = new URLSearchParams();
        data.append('name', categoryName);
        commit('toggleLoading');
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          dispatch('getAllCategories');
          commit('doneCreateCategory');
          commit('toggleLoading');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    // 更新ページに遷移した際に表示するカテゴリー名
    editDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res => {
        commit('editDetail', res.data.category.name);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // 更新の入力欄に入力中
    inputCategory({ commit }, target) {
      commit('inputCategory', target);
    },
    // 更新ボタン押した時のAPI
    updateCategory({ commit, rootGetters }, categoryId) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/targetCategoryId']);
      data.append('name', rootGetters['categories/targetCategoryName']);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${categoryId}`,
        data,
      }).then(res => {
        commit('updateCategory');
        commit('editDetail', res.data.category.name);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
        commit('afterDoneClearMessage');
        commit('toggleLoading');
      });
    },
    setTargetDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('setTargetDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise(resolve => {
        commit('afterDoneClearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('afterDoneClearMessage');
      commit('clearErrorMessage');
    },
  },
};
