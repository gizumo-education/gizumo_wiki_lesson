import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    targetCategory: {
      id: null,
      name: '',
    },
    category: {
      id: null,
      name: '',
    },
    deleteCategoryName: '',
    deleteCategoryId: null,
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList = state.categoryList.reverse();
    },
    setDeleteCategoryInfo(state, payload) {
      state.deleteCategoryName = payload.categoryName;
      state.deleteCategoryId = payload.categoryId;
    },
    doneDeleteCategory(state) {
      const index = state.categoryList.findIndex(i => i.id === state.deleteCategoryId);
      state.categoryList.splice(index, 1);
      state.doneMessage = 'カテゴリーの削除が完了しました。';
      state.deleteCategoryId = null;
    },
    newAddCategory(state, payload) {
      state.loading = false;
      state.categoryList.unshift(payload);
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategoryList({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        const payload = {
          categories: response.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    setDeleteCategoryInfo({ commit }, { id, name }) {
      const payload = {
        categoryId: id,
        categoryName: name,
      };
      commit('setDeleteCategoryInfo', payload);
    },
    deleteCategory({ commit, rootGetters, state }) {
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${state.deleteCategoryId}`,
        data: { id: this.deleteCategoryId },
      }).then(() => {
        commit('doneDeleteCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    addCategory({ commit, rootGetters }, categoryName) {
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: { name: categoryName },
      }).then(response => {
        const payload = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('newAddCategory', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
