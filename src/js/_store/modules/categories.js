import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    // メッセージをベタ書き
    doneMessage: '',
    errorMessage: '',
    loading: false,
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
    emptySuccessMessage(state) {
      state.doneMessage = '';
    },
    emptyIncompleteMessage(state) {
      state.errorMessage = '';
    },
    changeLoading(state) {
      // 反転させる方法で
      state.loading = !state.loading;
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
        commit('emptyIncompleteMessage');
        commit('successMessage');
        // 通信が成功したら、実行したい処理をここに記述しないと、リロードしないと処理が実行されないということになる
        dispatch('getAllLists');
        const payload = {
          addCategory: res.data.categories,
        };
        commit('postCategory', payload);
      }).catch(err => {
        commit('changeLoading');
        commit('emptySuccessMessage');
        commit('incompleteMessage');
        commit('postCategory', { message: err.message });
      });
    },
  },
};
