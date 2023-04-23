import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
      user: {
        account_name: '',
        created_at: '',
        email: '',
        full_name: '',
        id: '',
        password_reset_flg: null,
        role: '',
        updated_at: '',
      },
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
    categoryList(state) {
      return state.categoryList;
    },
  },
  mutations: {
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
        // user: {
        //   account_name: '',
        //   created_at: '',
        //   email: '',
        //   full_name: '',
        //   id: '',
        //   password_reset_flg: null,
        //   role: '',
        //   updated_at: '',
        // },
      };
    },
    doneGetCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, ...payload.categories };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories.reverse()];
    },
    editedCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
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
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    editedCategory({ commit }, category) {
      commit({
        type: 'editedCategory',
        category,
      });
    },
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory'].name);
        //  data.append('user_id', rootGetters['auth/user'].id);
        //  自分用メモ：fetchとaxios同じ意味で大丈夫
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
