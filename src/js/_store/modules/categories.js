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
    },
    categories: [],
  },
  getters: {
    // userListLength: state => state.userList.length,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    applyRequest(state) {
      state.loading = true;
    },
    doneGetAllCategories(state, { categories }) {
      state.categories = categories;
      state.loading = false;
    },
    doneCreateCategory(state) {
      state.loading = false;
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
    doneEditUser(state, { user }) {
      state.user = { ...state.user, ...user };
      state.loading = false;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
    editUser({ commit, rootGetters }, user) {
      commit('applyRequest');

      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${user.id}`,
        data: user,
      }).then(response => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const editedUser = {
          id: response.data.user.id,
          fullName: response.data.user.full_name,
          accountName: response.data.user.account_name,
          email: response.data.user.email,
          role: response.data.user.role,
        };

        commit('doneEditUser', { editedUser });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },

    // ユーザー削除のモーダルを開く
    openDeleteModal({ commit }, { id }) {
      commit('openDeleteModal', { id });
    },
    // ユーザー削除
    deleteUser({ commit, rootGetters }, { id }) {
      commit('applyRequest');

      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/user/${id}`,
        }).then(response => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneDeleteUser');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.message });
        });
      });
    },
  },
};
