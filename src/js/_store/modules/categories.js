import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    deleteCategory: {
      name: null,
      id: null,
    },
    doneMessage: '',
    errorMessage: '',
    loading: false,
  },
  getters: {
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    // updateCategory(state, { category }) {
    //   state.targetCategory = { ...state.targetCategory, ...category };
    // },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    confirmDeleteCategoryId(state, { categoryId }) {
      state.deleteCategory.id = categoryId;
    },
    confirmDeleteCategoryName(state, { categoryName }) {
      state.deleteCategory.name = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategory.id = null;
      state.deleteCategory.name = null;
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
        this.categoryList = payload.categories.reverse();
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters, dispatch }, categoryName) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          dispatch('getAllCategories');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        }).finally(() => {
          commit('toggleLoading');
        });
      });
    },
    // updateCategory({ commit, rootGetters }) {
    //   commit('toggleLoading');
    //   const data = new URLSearchParams();
    //   data.append('name', rootGetters['categories/targetCategory'].name);
    //   data.append('id', rootGetters['categories/targetCategory'].id);
    //   data.append('title', rootGetters['categories/targetCategory'].title);
    //   data.append('content', rootGetters['categories/targetCategory'].content);
    //   data.append('user_id', rootGetters['categories/targetCategory'].user.id);
    //   data.append('category_id', rootGetters['categories/targetCategory'].category.id);
    //   axios(rootGetters['auth/token'])({
    //     method: 'PUT',
    //     url: `/category/${rootGetters['categories/targetCategory'].id}`,
    //     data,
    //   }).then(res => {
    //     const payload = {
    //       category: {
    //         name: res.data.category.name,
    //       },
    //       article: {
    //         id: res.data.article.id,
    //         title: res.data.article.title,
    //         content: res.data.article.content,
    //         updated_at: res.data.article.updated_at,
    //         created_at: res.data.article.created_at,
    //         user: res.data.article.user,
    //         category: res.data.article.category,
    //       },
    //     };
    //     commit('updateCategory', payload);
    //     commit('toggleLoading');
    //     commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
    //   }).catch(() => {
    //     commit('toggleLoading');
    //   });
    // },
    confirmDeleteCategoryId({ commit }, categoryId) {
      commit('confirmDeleteCategoryId', { categoryId });
    },
    confirmDeleteCategoryName({ commit }, categoryName) {
      commit('confirmDeleteCategoryName', { categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      commit('clearMessage');
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
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
