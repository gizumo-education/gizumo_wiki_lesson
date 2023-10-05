import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList;
    },
    getCategory(state) {
      return state.category.name;
    },
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      return state.categoryList.reverse();
    },
    editedCategory(state, category) {
      state.category.name = category;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneEditCategory(state, { name }) {
      state.categoryList = { ...state.category, ...name };
      state.loading = false;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    deletePostName(state) {
      state.category.name = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    confirmDeleteCategoryName(state, { categoryName }) {
      state.deleteCategory.name = categoryName;
    },
    confirmDeleteCategoryId(state, { categoryId }) {
      state.deleteCategory.id = categoryId;
    },
    doneDeleteCategory(state) {
      state.deleteCategory.id = null;
      state.deleteCategory.name = null;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
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
    editedCategory({ commit }, category) {
      commit('editedCategory', category);
    },
    postCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', state.category.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(() => {
        commit('clearMessage');
        this.dispatch('categories/getAllCategories');
        commit('displayDoneMessage');
        commit('deletePostName');
        commit('toggleLoading');
      }).catch(err => {
        commit('failRequest', { message: err.message });
        commit('toggleLoading');
      });
    },
    confirmDeleteCategoryName({ commit }, categoryName) {
      commit('confirmDeleteCategoryName', { categoryName });
    },
    confirmDeleteCategoryId({ commit }, categoryId) {
      commit('confirmDeleteCategoryId', { categoryId });
    },
    deleteCategory({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
      }).then(() => {
        commit('doneDeleteCategory');
        this.dispatch('categories/getAllCategories');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
