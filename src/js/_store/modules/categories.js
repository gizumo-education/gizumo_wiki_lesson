import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      name: '',
    },
    categoryList: [],
    deleteCategoryId: null,
    loading: false,
    doneMessage: '', // 作成成功時のメッセージ
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    // カテゴリーリスト取得
    doneGetAllCategories(state, categories) {
      state.categoryList = categories;
      state.loading = false;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    // doneMessageにinputに入力した値をカテゴリー名に入れる
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    updateValue(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
      };// targetCategoryを初期化
    },
    donePostCategory(state, payload) {
      state.categoryList.unshift(payload);
    },
  },
  actions: {
    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);

        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', categories);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // inputに入力した値をupdateValueに渡す
    updateValue({ commit }, name) {
      commit({ type: 'updateValue', name });
    },
    // カテゴリー作成
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', rootGetters['categories/targetCategory'].name);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(response => {
          commit('donePostCategory', response.data.category);
          commit('initPostCategory');
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
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
