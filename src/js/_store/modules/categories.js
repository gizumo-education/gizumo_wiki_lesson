import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      id: null,
      name: '',
    },
    // updateCategory: {
    //   id: null,
    //   name: '',
    // },
    deleteCategory: {
      name: null,
      id: null,
    },
    doneMessage: '',
    errorMessage: '',
    loading: false,
  },
  getters: {
    // transformedCategories(state) {
    //   return state.categoryList.map(category => ({
    //     id: category.id,
    //     name: category.name,
    //   }));
    // },
    updateCategory: state => state.updateCategory,
    targetCategory: state => state.targetCategory,
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
      state.updateCategory = {
        id: null,
        name: '',
      };
    },
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
    updateValue(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    updateCategory(state, { category }) {
      state.categoriesList = [...state.categoriesList, ...category]
    },
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
    doneUpdateCategory(state, payload) {
      state.targetCategory = payload.targetCategory;
    },
    editName(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    // doneEditCategory(state, { updateCategory }) {
    //   state.updateCategory = { ...state.updateCategory, ...updateCategory };
    // },
    doneEditCategory(state, { category }) {
      state.category = { ...state.targetCategory, ...category };
      state.loading = false;
      //state.doneMessage = 'ユーザーの更新が完了しました。';
    },
    // updateCategoryName(state, payload) {
    //   state.categoriesList = [payload.updateCategory.category, ...state.categoriesList];
    // },
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
    getUpdateCategory({ commit, rootGetters }, categoryId) {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${categoryId}`,
        }).then(res => {
          const payload = {
            targetCategory: {
              id: res.data.category.id,
              name: res.data.category.name,
            },
          };
          commit('doneUpdateCategory', payload);
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
    },
    updateName({ commit, rootGetters }, categoryId) {
      console.log(rootGetters['categories/targetCategory'].name);
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['categories/targetCategory'].id);
      data.append('name', rootGetters['categories/targetCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${categoryId}`,
          data,
        }).then(res => {
          const payload = {
            id: res.data.category.id,
            name: res.data.category.name,
          };
          commit('doneEditCategory', payload);
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'ドキュメントを更新しました' });
          console.log(disabled);
        }).catch(() => {
          commit('toggleLoading');
        });
    },
    // updateArticle({ commit, rootGetters }) {
    //   commit('toggleLoading');
    //   const data = new URLSearchParams();
    //   data.append('id', rootGetters['articles/targetArticle'].id);
    //   data.append('title', rootGetters['articles/targetArticle'].title);
    //   data.append('content', rootGetters['articles/targetArticle'].content);
    //   data.append('user_id', rootGetters['articles/targetArticle'].user.id);
    //   data.append('category_id', rootGetters['articles/targetArticle'].category.id);
    //   axios(rootGetters['auth/token'])({
    //     method: 'PUT',
    //     url: `/article/${rootGetters['articles/targetArticle'].id}`,
    //     data,
    //   }).then(res => {
    //     const payload = {
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
    //     commit('updateArticle', payload);
    //     commit('toggleLoading');
    //     commit('displayDoneMessage', { message: 'ドキュメントを更新しました' });
    //   }).catch(() => {
    //     commit('toggleLoading');
    //   });
    // },
    editName({ commit }, name) {
      commit({
        type: 'editName',
        name,
      });
    },
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
