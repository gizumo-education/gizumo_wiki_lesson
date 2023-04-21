import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: '',
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    disabled: false,
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  mutations: {
    initTargetCategory(state) {
      state.targetCategory = '';
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = payload.categories.reverse();
    },
    updateCategory(state, payload) {
      state.targetCategory = payload.targetCategory;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.disabled = !state.disabled;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    openDeleteModal(state, payload) {
      state.deleteCategory = {
        ...state.deleteCategory,
        id: payload.id,
        name: payload.name,
      };
    },
    doneDeleteCategory(state) {
      state.deleteCategory = {
        ...state.deleteCategory,
        id: null,
        name: '',
      };
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteCategory: state => state.deleteCategory,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    initTargetCategory({ commit }) {
      commit('initTargetCategory');
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
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updatedCategory({ commit }, value) {
      const payload = {
        targetCategory: value,
      };
      commit('updateCategory', payload);
    },
    addCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');

        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory']);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${this.state.categories.deleteCategory.id}`,
        }).then(() => {
          commit('doneDeleteCategory');
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    setDeleteCategory({ commit }, { id, name }) {
      commit('clearMessage');
      const payload = {
        id,
        name,
      };
      commit('openDeleteModal', payload);
    },
  },
};
