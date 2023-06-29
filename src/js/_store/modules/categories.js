import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      name: '',
      id: null,
    },
    categoryList: [],
    errorMessage: '',
    doneMessage: '',
    loading: false,
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  mutations: {
    initPostCategories(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories.reverse()];
    },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...payload };
      state.categoryList.unshift(payload);
    },
    failRequest(state, { message }) { state.errorMessage = message; },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload) {
      state.doneMessage = payload.message;
    },
    updateCategories(state, categoryName) {
      state.targetCategory = { ...state.targetCategory, ...categoryName };
    },
    confirmDeleteCategory(state, { payload }) {
      state.deleteCategory.id = payload.categoryId;
      state.deleteCategory.name = payload.categoryName;
    },
    editedContent(state, payload) {
      state.targetCategory.name = payload;
    },
    doneGetCategoryDetail(state, category) {
      state.targetCategory.name = category
    },
    clearCategory(state){
      console.log(state.targetCategory)
    }

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
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategories({ commit, rootGetters, state }) {
      const data = { name: state.targetCategory.name };
      commit('toggleLoading');
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(res => {
        commit('toggleLoading');
        commit('displayDoneMessage', {
          message: 'ドキュメントを作成しました',
        });
        commit('doneGetCategory', res.data.category);
        commit('initPostCategories');
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategories({ commit }, payload) {
      const categoryName = {
        name: payload,
      };
      commit('updateCategories', categoryName);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, payload) {
      commit('confirmDeleteCategory', { payload });
    },
    deleteCategory({ commit, rootGetters, state }) {
      return new Promise(resolve => {
        commit('clearMessage');
        const data = parseInt(state.deleteCategory.id, 10);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${data}`,
        }).then(() => {
          axios(rootGetters['auth/token'])({
            method: 'GET',
            url: '/category',
          }).then(res => {
            const payload = { categories: res.data.categories };
            commit('doneGetAllCategories', payload);
            commit('displayDoneMessage', {
              message: 'カテゴリーの削除が完了しました',
            });
            resolve();
          });
        });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    getCategoryDetail({commit,rootGetters},categoryId){
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res=>{
        const category =res.data.category.name
        commit('doneGetCategoryDetail',category)
      })
    },

    updateCategory({commit, rootGetters,state},categoryId){
      commit('clearMessage')
      commit('toggleLoading');
      const data =state.targetCategory
      axios(rootGetters['auth/token'])
      ({
        method: 'PUT',
        url:`/category/${categoryId}`,
        data,
      }).then(()=>{
        commit('toggleLoading');
        commit('displayDoneMessage',{
          message: 'カテゴリーを更新しました'
        });
      }).catch(err=>{
        commit('toggleLoading');
        commit('failRequest',{
          message: err.message
        });
      })
    },
    editedContent({commit},payload){
      commit('editedContent',payload)
    },
    clearCategory({commit}){
      commit('initPostCategories')
    }
  },
};
