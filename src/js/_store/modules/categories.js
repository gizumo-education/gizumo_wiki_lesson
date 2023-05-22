import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoryList: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList.map(category => ({
        id: category.id,
        content: `${category.name}`,
      }));
    },
    targetCategory: state => state.targetCategory,
    categoryList(state) {
      return state.categoryList;
    },
    deleteCategoryId: state => state.deleteCategoryId,
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
    },
    deleteCategoryName(state, { categoryName }) {
      state.deleteCategoryName = categoryName;
    },
    confirmDeleteCategory(state, { categoryId }) {
      state.deleteCategoryId = categoryId;
    },
    doneDeleteCategory(state) {
      state.targetCategoryId = null;
    },
    displayAllCategories(state, payload) {
      state.categoryList = state.categoryList.filter(value => value.id !== payload.id);
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories.reverse()];
    },
    editedCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload };
    },
    setTargetCategory(state, categoryId) {
      const targetCategory = state.categoryList.filter(value => value.id === categoryId);
      state.targetCategory = { ...targetCategory[0] };
    },
    updateCategory(state, { category }) {
      state.targetCategory = { ...state.targetCategory, ...category };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    initPostCategory({ commit }) {
      commit('initPostCategory');
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
        commit('initPostCategory');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    editedCategory({ commit }, name) {
      commit('editedCategory', name);
    },
    setTargetCategory({ commit }, id) {
      commit('setTargetCategory', id);
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/targetCategory'].id);
      data.append('name', rootGetters['categories/targetCategory'].name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${rootGetters['categories/targetCategory'].id}`,
        data,
      }).then(res => {
        const payload = {
          category: {
            id: res.data.category.id,
            name: res.data.category.name,
          },
        };
        commit('updateCategory', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId });
      commit('deleteCategoryName', { categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
      }).then(res => {
        const payload = {
          id: res.data.category.id,
        };
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
        commit('displayAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          commit('initPostCategory');
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
