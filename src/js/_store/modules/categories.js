import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    targetCategory: {
      id: null,
      name: '',
    },
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    editedCategory(state, payload) {
      state.targetCategory = { ...state.targetCategory, name: payload.name };
    },
  },
  actions: {
    // 一覧取得するアクションを定義する（中身の処理は不要）
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      })
      // 成功したら
        .then(res => {
          // console.log(res)
          const payload = {
            categories: res.data.categories,
          };
          commit('doneGetCategories', payload);
        })
      // 失敗したら
        .catch(err => {
          commit('failRequest', { message: err.message });
        });
    },
    // カテゴリ名入力のアクション定義
    editedCategory({ commit }, name) {
      commit({
        type: 'editedCategory',
        name,
      });
    },

    // ３作成ボタン押下アクション
    postCategories({ commit, rootGetters }) {
      const data = new URLSearchParams();
      data.append('name', rootGetters['categories/targetCategory'].name);
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
  },
};
