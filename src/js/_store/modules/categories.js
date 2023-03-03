import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories.reverse()];
    },
    doneGetCategoryName(state, category) {
      state.targetCategory = { ...state.targetCategory, ...category };
    },
    editedCategoryName(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, doneMessage = { message: '成功しました' }) {
      state.doneMessage = doneMessage.message;
    },
  },
  actions: {
    // メッセージを非表示にする
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    // すべてのカテゴリーを取得
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
    // カテゴリー名の削除
    postCategory({ commit, rootGetters }, categoryName) {
      return new Promise(resolve => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('clearMessage');
          commit('toggleLoading');
          commit('displayDoneMessage', { message: '新規カテゴリーを作成しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    // カテゴリーの削除
    deleteCategory({ dispatch, commit, rootGetters }, deleteCategoryId) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${deleteCategoryId}`,
        }).then(() => {
          commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
          dispatch('getAllCategories');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    // 選択したカテゴリーを取得
    getCategoryName({ commit, rootGetters }, categoryId) {
      // console.log(categoryId)
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then(res => {
        const category = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('doneGetCategoryName', category);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // カテゴリーの編集
    editedCategoryName({ commit }, name) {
      commit({
        type: 'editedCategoryName',
        name,
      });
    },
    // カテゴリーの更新
    updateCategory({ commit, rootGetters, state }) {
      commit('clearMessage');
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', state.targetCategory.name);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${state.targetCategory.id}`,
        data,
      }).then(() => {
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'カテゴリーを更新しました' });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
  },
};
