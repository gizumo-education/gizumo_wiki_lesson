import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoryList: [],
    errorMessage: '',
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList.map(category => ({
        id: category.id,
        name: category.name,
      }));
    },
  },
  mutations: {
    doneGetCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
  },
};
