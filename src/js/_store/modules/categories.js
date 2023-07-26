import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categories: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
    targetCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    deleteCategoryId: state => state.deleteCategoryId,
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteArticleId = null;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    clearCategory(state) {
      state.targetCategory.name = '';
    },
    doneGetAllCategories(state, payload) {
      state.categories = [...payload.categories.reverse()];
      state.loading = false;
    },
    donePostCategory(state, payload) {
      state.categories.unshift(payload.category);
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updateCategoryName(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    editedName(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload.category };
    },
    updateCategory(state, { name }) {
      state.targetCategory = { ...state.targetCategory, ...name };
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    updateCategoryName({ commit }, name) {
      commit({
        type: 'updateCategoryName',
        name,
      });
    },
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
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
    // 新規カテゴリー作成
    postCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', state.targetCategory.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(response => {
        const payload = {
          category: response.data.category,
        };
        commit('donePostCategory', payload);
        commit('clearCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      }).finally(() => {
        commit('toggleLoading');
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    // カテゴリー削除
    deleteCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${state.deleteCategoryId}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    // カテゴリー更新
    editedName({ commit }, name) {
      commit({
        type: 'editedName',
        name,
      });
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
          id: res.data.category.id,
          name: res.data.category.title,
        };
        commit('updateCategory', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
    // 更新画面遷移時に名前を取得
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      return new Promise((resolve, reject) => {
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
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
