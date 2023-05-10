import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      name: '',
      id: null,
    },
    deleteCategory: {
      name: '',
      id: null,
    },
    editCategory: {
      name: '',
      id: null,
    },
    disabled: false,
    categoryList: [],
    loading: false,
    doneMessage: '',
    editDoneMessage: '',
    errorMessage: '',
    errorMessagePost: '',
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
    editCategoryId: state => state.editCategory.id,
    editCategoryName: state => state.editCategory.name,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload];
    },
    updateValue(state, payload) {
      state.targetCategory.name = payload;
    },
    clearTargetCategory(state) {
      state.targetCategory = {
        name: '',
        id: 'null',
      };
    },
    switchDisabled(state) {
      state.disabled = !state.disabled;
    },
    failRequest(state, { errorMessage, errorMessagePost }) {
      state.errorMessage = errorMessage;
      state.errorMessagePost = errorMessagePost;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessagePost = '';
      state.editDoneMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    confirmDeleteCategory(state, payload) {
      state.deleteCategory = payload;
    },
    editValue(state, payload) {
      state.editCategory.name = payload;
    },
    editedName(state, payload) {
      state.editCategory = { ...state.editCategory, ...payload.name };
    },
    editDoneMessage(state, payload = { message: '成功しました' }) {
      state.editDoneMessage = payload.message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload };
    },
    doneGetEditCategory(state, payload) {
      state.editCategory = { ...state.editCategory, ...payload.category };
    },
    updateCategory(state) {
      state.targetCategory = { ...state.targetCategory, name: '' };
      state.editCategory = { ...state.editCategory };
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = res.data.categories.reverse();
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, targetCategory) {
      const payload = targetCategory;
      commit('updateValue', payload);
      commit('clearMessage');
    },
    postCategory({ commit, state, rootGetters }) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('switchDisabled');
        const data = {
          name: state.targetCategory.name,
        };
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
          commit('clearTargetCategory');
        }).catch(() => {
          commit('failRequest', { errorMessagePost: '失敗しました' });
        }).finally(() => {
          commit('switchDisabled');
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, payload) {
      commit('confirmDeleteCategory', payload);
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
      }).then(() => {
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
        dispatch('getAllCategories');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    editValue({ commit }, payload) {
      commit('editValue', payload);
      commit('clearMessage');
    },
    editedName({ commit }, name) {
      commit({
        type: 'editedName',
        name,
      });
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res => {
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
          },
        };
        commit('doneGetCategory', payload);
        commit('doneGetEditCategory', payload);
      }).catch(err => {
        commit('failRequest', { errMessage: err.message });
      });
    },
    updateCategory({ commit, state, rootGetters }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = {
        name: state.editCategory.name,
      };
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.editCategory.id}`,
        data,
      }).then(() => {
        commit('updateCategory');
        commit('editDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(() => {
        commit('failRequest', { errorMessagePost: '失敗しました' });
      }).finally(() => {
        commit('toggleLoading');
      });
    },
    showMessage({ commit }) {
      commit('failRequest', { errorMessagePost: 'カテゴリー名を変更してください。' });
    },
  },
};
