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
  },
  actions: {
    confirmDeleteCategory({ commit }, payload) {
      commit('confirmDeleteCategory', { payload });
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
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    loading({ commit }) {
      commit('loading');
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
  },
};
