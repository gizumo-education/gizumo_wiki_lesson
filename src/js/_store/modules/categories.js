import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategory: {
      id: null,
      title: '',
      content: '',
      category: {
        id: null,
        name: '',
      },
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
    loading: false, // loadingの判定→「作成中...」に変化
    doneMessage: '',
    errorMessage: '',
  },
  getters: {
    targetCategory: state => state.targetCategory,
    deleteArticle: state => state.deleteArticleId,
  },
  mutations: {
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    mutateCategories(state, payload) {
      state.categoryList = payload.categories;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    targetCategory(state, payload) {
      state.targetCategory.category.name = payload.categoryName;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    // mutatePostCategories(state, payload) {
    //   state.categoryList = state.categoryList.reverse();
    // },
  },
  actions: {
    getCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        // resで受け取ったデータから「categories」(一覧)を取得
        const payload = {
          categories: res.data.categories,
        };
        commit('mutateCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    postCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        // console.log(rootGetters['categories/targetCategory']); // オブジェクト形式で取得
        data.append('name', rootGetters['categories/targetCategory'].category.name);
        if (rootGetters['categories/targetCategory'].category.name !== null) {
          data.append(
            'category_id',
            rootGetters['categories/targetCategory'].category.name,
          );
        }
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          resolve();
          // console.log(res); // 入力内容を{}で取得
          // リロードしないと更新できない→getCategoriesを実行        }).catch(() => {
          // console.log(err); // 何も表示されず※後で消す
        }).catch(() => {
          commit('toggleLoading');
          reject();
        });
      });
    },
    targetCategory({ commit }, categoryName) {
      commit({
        type: 'targetCategory',
        categoryName,
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    // deleteCategory({ commit, rootGetters }) {
    //   console.log(commit);
    //   console.log(rootGetters);
    // },
  },
};
