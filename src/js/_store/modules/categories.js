import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    deleteCategoryId: null,
    loading: false,
    // メッセージをベタ書き
    doneMessage: '',
    errorMessage: '',
  },
  mutations: {
    getAllLists(state, res) {
      state.categoriesList = res.categories.reverse();
    },
    postCategory(state, res) {
      state.categoryPost = res.categories;
    },
    successMessage(state) {
      state.doneMessage = 'カテゴリーが追加されました';
    },
    incompleteMessage(state) {
      state.errorMessage = 'カテゴリーが追加できませんでした';
    },
    changeLoading(state) {
      // 反転させる方法で
      state.loading = !state.loading;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
  },
  actions: {
    getAllLists({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('getAllLists', payload);
      }).catch(err => {
        commit('getAllLists', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters, dispatch }, categoryName) {
      // 真偽値を反転させる
      commit('clearMessage');
      commit('changeLoading');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: categoryName,
        },
      }).then(res => {
        // 真偽値を反転させる
        commit('changeLoading');
        commit('clearMessage');
        commit('successMessage');
        // 通信が成功したら、実行したい処理をここに記述しないと、
        // リロードしないと処理が実行されないということになる
        dispatch('getAllLists');
        const payload = {
          addCategory: res.data.categories,
        };
        commit('postCategory', payload);
      }).catch(err => {
        commit('changeLoading');
        commit('clearMessage');
        commit('incompleteMessage');
        commit('postCategory', { message: err.message });
      });
    },
    // Category.vueで、openModal(id, name)で取得したidをcategoryIdに代入したので
    // それをurl後ろに表示されるようにすると削除できる
    deleteCategory({ commit, rootGetters, dispatch },categoryId) {
      commit('clearMessage');
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${categoryId}`,
      }).then(() => {
        // 通信が成功したら、実行したい処理をここに記述しないと、
        // リロードしないと処理が実行されないということになるので→dispatch('getAllLists');
        dispatch('getAllLists');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
