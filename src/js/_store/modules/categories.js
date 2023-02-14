import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      id: null,
      name: '',
    },
    loading: false,
    doneMessage: '',
    errorMessage: '',
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
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    updateValue(state, data) {
      state.targetCategory.name = data;
    },
    clearValue(state) {
      state.targetCategory.name = '';
    },
  },
  getters: {
    targetCategory: state => state.targetCategory,
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
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', this.getters['categories/targetCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('clearMessage');
          axios(rootGetters['auth/token'])({
            method: 'GET',
            url: '/category',
          }).then(res => {
            if (res.data.code === 0) throw new Error(res.data.message);
            commit('doneGetAllCategories', res.data.categories);
            commit('clearValue');
            commit('displayDoneMessage', { message: 'カテゴリーを作成しました' });
            resolve();
          }).catch(err => {
            commit('failRequest', { message: err.message });
          });
        }).catch(err => {
          commit('toggleLoading');
          reject();
          commit('failRequest', { message: err.message });
        });
      });
    },
    updateValue({ commit }, data) {
      commit('updateValue', data);
      commit('clearMessage');
    },
  },
};
