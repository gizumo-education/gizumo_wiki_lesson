import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    doneMessage: '',
    errorMessage: '',
    deleteCategory: {
      id: null,
      name: '',
    },
    category: {
      id: null,
      name: '',
    },
    loading: false,
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
    category: state => state.category,
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    updateValue(state, { name, value }) {
      state.category = { ...state.category, [name]: value };
    },
    setCategories(state, { categories }) {
      state.categoriesList = categories;
    },
    doneCreateCategory(state) {
      state.doneMessage = '新しいカテゴリーが作成されました。';
    },
    confirmDeleteCategory(state, categoryIdName) {
      state.deleteCategory.id = categoryIdName.id;
      state.deleteCategory.name = categoryIdName.name;
    },
    doneDeleteCategory(state) {
      state.deleteCategory.id = null;
      state.deleteCategory.name = '';
    },
    displayDoneMessage(state) {
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneGetCategory(state, { category }) {
      state.category = { ...state.category, ...category };
    },
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    getCategoryList({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const categories = res.data.categories.reverse();
        commit('setCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    addCategory({ commit, rootGetters, dispatch }, categoryName) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: categoryName,
        },
      }).then(() => {
        dispatch('getCategoryList');
        commit('doneCreateCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    confirmDeleteCategory({ commit }, categoryIdName) {
      commit('confirmDeleteCategory', categoryIdName);
    },
    deleteCategory({ commit, rootGetters, dispatch }) {
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
      }).then(() => {
        dispatch('getCategoryList');
        commit('doneDeleteCategory');
        commit('displayDoneMessage');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    getCategory({ commit, rootGetters }, { id }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(response => {
        const category = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('doneGetCategory', { category });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({ commit, rootGetters }, category) {
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${rootGetters['categories/category'].id}`,
        data: {
          name: category.name,
        },
      }).then(() => {
        commit('doneGetCategory', { category });
        commit('doneUpdateCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
