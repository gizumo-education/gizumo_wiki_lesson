import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    user: {
      id: null,
      fullName: '',
      accountName: '',
      email: '',
      role: '',
    },
    deleteUserId: null,
    userList: [],
    roleList: [],
  },
  getters: {
    userListLength: state => state.userList.length,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    updateValue(state, { name, value }) {
      state.user = { ...state.user, [name]: value };
    },
    applyRequest(state) {
      state.loading = true;
    },
    doneGetAllUsers(state, { users }) {
      state.userList = users;
      state.loading = false;
    },
    doneGetUser(state, { user, roleList }) {
      state.user = { ...state.user, ...user };
      state.roleList = roleList;
      state.loading = false;
    },
    doneCreateUser(state) {
      state.loading = false;
      state.doneMessage = '新規ユーザーの追加が完了しました。';
    },
    doneEditUser(state, { user }) {
      state.user = { ...state.user, ...user };
      state.loading = false;
      state.doneMessage = 'ユーザーの更新が完了しました。';
    },
    openDeleteModal(state, { id }) {
      state.deleteUserId = id;
    },
    doneDeleteUser(state) {
      state.deleteUserId = null;
      state.doneMessage = 'ユーザーの削除が完了しました。';
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

    // ユーザー全件取得
    getAllUsers({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/user',
      }).then(response => {
        // NOTE: エラー時はresponse.data.codeが0で返ってくる。
        if (response.data.code === 0) throw new Error(response.data.message);

        const users = response.data.users.map(data => ({
          id: data.id,
          fullName: data.full_name,
          accountName: data.account_name,
          email: data.email,
          role: data.role,
        }));
        commit('doneGetAllUsers', { users });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },

    // ユーザー1件取得
    getUser({ commit, rootGetters }, { id }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/user/${id}`,
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

    // ユーザー作成
    createUser({ commit, rootGetters }, user) {
      commit('applyRequest');

      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/user',
          data: user,
        }).then(response => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneCreateUser');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },

    // ユーザー更新
    editUser({ commit, rootGetters }, user) {
      commit('applyRequest');

      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/user/${user.id}`,
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
