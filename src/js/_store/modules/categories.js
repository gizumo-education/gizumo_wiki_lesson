import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    categoriesList: [],
    // メッセージをベタ書き
    doneMessage: '',
  },
  mutations: {
    getAllLists(state, res) {
      state.categoriesList = res.categories.reverse();
    },
    getCategoryName(state, res) {
      state.categoryPost = res.categories;
    },
    successMessage(state) {
      state.doneMessage = 'カテゴリーが追加されました'
    },
    eraseMessage(state) {
      state.doneMessage = ''
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
    getCategoryName({ commit, rootGetters, dispatch }, categoryName) {
      console.log(categoryName);
      commit('eraseMessage');
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data: {
          name: categoryName,
        },
      }).then(res => {
        commit('successMessage');
        // 通信が成功したら、実行したい処理をここに記述しないと、リロードしないと処理が実行されないということになる
        dispatch('getAllLists');
        const payload = {
          addCategory: res.data.categories,
        };
        commit('getCategoryName', payload);
      }).catch(err => {
        commit('getCategoryName', { message: err.message });
      });
      
    },

  },
};
