import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    loading: false,
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
    upCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    upCategory: state => state.upCategory,
  },
  mutations: {
    addCategory(state, category) {
      state.categoryList.unshift(category);
    },
    doneAllCategories(state, payload) {
      state.categoryList = [...payload.categories].reverse();
    },
    errorMessage(state, message) {
      state.errorMessage = message;
    },
    loading(state) {
      state.loading = !state.loading;
    },
    doneMessage(state, message) {
      state.doneMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    confirmDeleteCategory(state, { payload }) {
      state.deleteCategory.id = payload;
      state.deleteCategory.name = payload.categoryName;
    },
    updateValue(state, payload) {
      state.upCategory = { ...state.upCategory, name: payload.name };
    },
    doneGetCategory(state, upCategory) {
      state.upCategory = { ...state.upCategory, ...upCategory };
    },
    toggleLoading(state) {
      state.loading = !state.loading;
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
        commit('doneAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit, rootGetters }, categoryName) {
      return new Promise(resolve => {
        commit('clearMessage');
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          const createdCategory = response.data.category;
          commit('addCategory', createdCategory);
          commit('doneMessage', 'カテゴリー名一覧に追加成功');
          resolve();
        }).catch(() => {
          commit('errorMessage', 'カテゴリー名一覧に追加失敗');
        }).finally(() => {
          commit('loading');
        });
      });
    },
    deleteCategory({ commit, rootGetters, state }) {
      return new Promise(resolve => {
        commit('clearMessage');
        const data = parseInt(state.deleteCategory.id.categoryId, 10);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${data}`,
        }).then(() => {
          commit('doneMessage', 'カテゴリーの削除が完了しました。');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    loading({ commit }) {
      commit('loading');
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, payload) {
      commit('confirmDeleteCategory', { payload });
    },
    getUpdateCategory({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `category/${id}`,
      }).then(response => {
        const upCategory = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('doneGetCategory', upCategory);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({ commit, rootGetters }) {
      commit('loading');
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('name', rootGetters['category/upCategory'].name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `category/${rootGetters['category/upCategory'].id}`,
        data,
      }).then(() => {
        commit('loading');
        commit('doneMessage', 'カテゴリーの更新に成功しました');
      }).catch(() => {
        commit('loading');
        commit('errorMessage', 'カテゴリーの更新に失敗しました');
      });
    },
    updateValue({ commit }, name) {
      commit('updateValue', { name });
    },
  },
};
