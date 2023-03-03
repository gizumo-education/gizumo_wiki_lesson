import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    errorMessage: '',
    doneMessage: '',
    editCategoryDoneMessage: '',
    editCategoryErrorMessage: '',
    categoryList: [],
    category: {
      id: null,
      name: '',
    },
  },

  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories.reverse();
    },
    editedCategory(state, payload) {
      state.category = { ...state.category, title: payload.title };
    },
    doneGetCategory(state, { category }) {
      state.category = { ...state.category, ...category };
      state.loading = false;
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    modalDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    doneEditCategory(state, { category }) {
      state.category = { ...state.category, ...category };
      state.isLoading = false;
      state.editCategoryDoneMessage = 'カテゴリーの更新が完了しました。';
    },
    editFailRequest(state, { message }) {
      state.editCategoryErrorMessage = message;
    },
    loadingFalse(state) {
      state.isLoading = false;
    },
    applyRequest(state) {
      state.isLoading = true;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (!response.data.categories) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // カテゴリー新規作成
    createCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: categoryName,
        }).then(response => {
          commit('toggleLoading');
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('displayDoneMessage', { message: '新規カテゴリーの追加が完了しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    // カテゴリー削除のモーダルを開く
    modalCategory({ commit }, { categoryId, categoryName }) {
      commit('modalDeleteCategory', { categoryId, categoryName });
    },
    // カテゴリー削除
    deleteCategory({ commit, rootGetters }, categoryId) {
      commit('clearMessage');
      const data = new URLSearchParams();
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${categoryId}`,
        data,
      }).then(() => {
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // カテゴリー1件取得
    getCategoryDetail({ commit, rootGetters }, { id }) {
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${id}`,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          const data = response.data.category;
          const category = {
            id: data.id,
            name: data.name,
          };
          commit('doneGetCategory', { category });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    // カテゴリー更新
    editCategory({ commit, rootGetters }, category) {
      commit('applyRequest');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${category.id}`,
        data: category,
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const editedCategory = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('doneEditCategory', { editedCategory });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
