import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    category: {
      id: null,
      name: '',
      role: '',
    },
    deleteCategoryId: null,
    categories: [],
    roleList: [],
  },
  mutations: {
    doneGetAllCategories(state, { categories }) {
      state.categories = categories.reverse();
      state.loading = false;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },

    // カテゴリー全件取得
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },

    // カテゴリー1件取得
    getUser({ commit, rootGetters }, { id }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(response => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const data = response.data.user;
        const user = {
          id: data.id,
          fullName: data.full_name,
          accountName: data.account_name,
          email: data.email,
          role: data.role.value,
        };
        commit('doneGetUser', { user, roleList: response.data.role });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },

    // カテゴリー作成
    createCategory({ commit, rootGetters }, category) {
      commit('applyRequest');

      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: category,
        }).then(response => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneCreateCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },

    // カテゴリー更新
    editUser({ commit, rootGetters }, category) {
      commit('applyRequest');

      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${category.id}`,
        data: category,
      }).then(response => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const editedCategory = {
          id: response.data.category.id,
          Name: response.data.category.account_name,
        };

        commit('doneEditUser', { editedCategory });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    // ユーザー削除のモーダルを開く
    openDeleteModal({ commit }, { id }) {
      commit('openDeleteModal', { id });
    },
    // カテゴリー削除
    openModal({ commit, rootGetters }, { id }) {
      commit('applyRequest');

      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${id}`,
        }).then(response => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneDeleteCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};

