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
    newNameIdCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    newNameIdCategory: state => state.newNameIdCategory,
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
      state.newNameIdCategory = { ...state.newNameIdCategory, name: payload.name };
    },
    doneGetCategory(state, newNameIdCategory) {
      state.newNameIdCategory = { ...state.newNameIdCategory, ...newNameIdCategory };
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
        commit('loading');
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
        const deletedataid = parseInt(state.deleteCategory.id.categoryId, 10);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${deletedataid}`,
        }).then(() => {
          commit('doneMessage', 'カテゴリーの削除が完了しました。');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    confirmDeleteCategory({ commit }, payload) {
      commit('confirmDeleteCategory', { payload });
    },
    getCategory({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `category/${id}`,
      }).then(response => {
        const newNameIdCategory = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        commit('doneGetCategory', newNameIdCategory);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateCategory({ commit, rootGetters }) {
      commit('loading');
      commit('clearMessage');
      const data = new URLSearchParams();
      data.append('name', rootGetters['category/newNameIdCategory'].name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `category/${rootGetters['category/newNameIdCategory'].id}`,
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
