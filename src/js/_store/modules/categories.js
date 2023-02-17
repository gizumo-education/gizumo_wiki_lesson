import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
    listDoneMessage: '',
    listErrorMessage: '',
  },
  mutations: {
    doneGetAllCategories(state, categories) {
      state.categoryList = categories.reverse();
    },
    failRequest(state, { message }) {
      state.errorMessage = `${message} ご確認の上、再度お試しください。`;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
      state.listDoneMessage = '';
      state.listErrorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneDeleteCategory(state) {
      state.listDoneMessage = 'カテゴリーの削除が完了しました。';
    },
    listFailRequest(state, { message }) {
      state.listErrorMessage = `${message} ご確認の上、再度お試しください。`;
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
    postCategory({ commit, rootGetters }, payload) {
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
          this.dispatch('categories/getAllCategories');
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },

    deleteCategory({ commit, rootGetters }, id) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${id}`,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('clearMessage');
          commit('doneDeleteCategory');
          this.dispatch('categories/getAllCategories');
          resolve();
        }).catch(err => {
          commit('listFailRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
