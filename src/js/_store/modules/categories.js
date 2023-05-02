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
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
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
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
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
  },
};
