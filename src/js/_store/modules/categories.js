import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
    editTargetCategory: {
      id: '',
      name: '',
    },
  },

  mutations: {
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    showDoneMessage(state, target) {
      state.doneMessage = `カテゴリーを${target}しました。`;
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      state.categoryList = state.categoryList.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    donePostCategory(state, newCategory) {
      state.categoryList.unshift(newCategory);
    },
    doneDeleteCategory(state, deletedCategoryId) {
      const deleteIndex = state.categoryList.findIndex(v => v.id === deletedCategoryId);
      state.categoryList.splice(deleteIndex, 1);
    },
    doneSetTarget(state, target) {
      state.editTargetCategory = target;
    },
    doneEditCategory(state, editedCategory) {
      const editedIndex = state.categoryList.findIndex(v => v.id === editedCategory.id);
      state.categoryList.splice(editedIndex, 1, editedCategory);
    },
  },

  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', err);
      });
    },
    postCategory({ commit, rootGetters }, categoryName) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: { name: categoryName },
      }).then(res => {
        const newCategory = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('donePostCategory', newCategory);
        commit('showDoneMessage', '作成');
      }).catch(err => {
        commit('failRequest', err);
      });
    },
    deleteCategory({ commit, rootGetters }, deleteCategoryId) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${deleteCategoryId}`,
      }).then(res => {
        commit('doneDeleteCategory', res.data.category.id);
        commit('showDoneMessage', '削除');
      }).catch(err => {
        commit('failRequest', err);
      });
    },
    editCategory({ commit, rootGetters }, updated) {
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${updated.id}`,
        data: { name: updated.name },
      }).then(res => {
        const editedCategory = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('doneEditCategory', editedCategory);
        commit('showDoneMessage', '変更');
      }).catch(err => {
        commit('failRequest', err);
      });
    },
    setTargetCategory({ commit, rootGetters }, targetId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${targetId}`,
      }).then(res => {
        const targetCategory = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('doneSetTarget', targetCategory);
      }).catch(err => {
        commit('failRequest', err);
      });
    },
  },
};
