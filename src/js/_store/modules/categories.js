import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      id: '',
      name: '',
    },
    loading: false,
    doneMessage: '',
    errorMessage: '',
    listDoneMessage: '',
    listErrorMessage: '',
    updateErrorMessage: '',
    updateDoneMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    editedTitle(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload };
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
      state.listDoneMessage = '';
      state.listErrorMessage = '';
      state.updateDoneMessage = '';
      state.updateErrorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    doneDeleteCategory(state) {
      state.listDoneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneUpdateCategory(state) {
      state.updateDoneMessage = 'カテゴリーの更新が完了しました。';
    },
    failRequest(state, { message }) {
      state.errorMessage = `${message} ご確認の上、再度お試しください。`;
    },
    listFailRequest(state, { message }) {
      state.listErrorMessage = `${message} ご確認の上、再度お試しください。`;
    },
    updateFailRequest(state, { message }) {
      state.updateErrorMessage = `${message} ご確認の上、再度お試しください。`;
    },
    reflectCategory(state, payload) {
      state.targetCategory.name = payload;
    },
  },
  actions: {
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        if (res.data.code === 0) throw new Error(res.data.message);
        commit('doneGetAllCategories', res.data.categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, dispatch, rootGetters }, payload) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', payload);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('clearMessage');
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
          dispatch('getAllCategories');
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    deleteCategory({ commit, dispatch, rootGetters }, id) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${id}`,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('clearMessage');
          commit('doneDeleteCategory');
          dispatch('getAllCategories');
          resolve();
        }).catch(err => {
          commit('listFailRequest', { message: err.message });
          reject();
        });
      });
    },
    updateCategory({ commit, rootGetters }, id) {
      return new Promise(() => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('id', id);
        data.append('name', rootGetters['categories/targetCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${id}`,
          data,
        }).then(() => {
          commit('clearMessage');
          commit('toggleLoading');
          commit('doneUpdateCategory');
        }).catch(err => {
          commit('toggleLoading');
          commit('updateFailRequest', { message: err.message });
        });
      });
    },
    editedTitle({ commit }, title) {
      commit('editedTitle', title);
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    reflectCategory({ commit, rootGetters }, id) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(res => {
        if (res.data.code === 0) throw new Error(res.data.message);
        const categoryName = res.data.category.name;
        commit('reflectCategory', categoryName);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
