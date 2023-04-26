import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    doneMessage: '',
    targetCategory: {
      id: null,
      name: '',
      category: {
        id: null,
        name: '',
      },
    },
    categoryList: [],
    loading: false,
    errorMessage: '',
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList.map(category => ({
        id: category.id,
        content: `${category.title}`,
      }));
    },
    targetCategory: state => state.targetCategory,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    initPostCategory(state) {
      state.targetCategory = {
        id: null,
        name: '',
        category: {
          id: null,
          name: '',
        },
      };
    },
    updateValue(state, { category, value }) {
      state.category = { ...state.category, [category]: value };
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    doneAddCategory(state) {
      state.loading = false;
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
    doneEditCategory(state, { category }) {
      state.targetCategory = { ...state.category, ...category };
      state.loading = false;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    applyRequest(state) {
      state.loading = false;
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    initPostCategory({ commit }) {
      commit('initPostCategory');
    },
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        const payload = {
          categories: response.data.categories.reverse(),
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    addCategory({ commit, rootGetters, dispatch }, category) {
      commit('applyRequest');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: { name: category.category },
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          dispatch('getAllCategories');
          commit('doneAddCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
        });
      });
    },
    editCategory({ commit, rootGetters }, category) {
      commit('applyRequest');
      axios(rootGetters['auth/token'])({
        method: 'PUSH',
        url: `/category/${category.id}`,
        data: category,
      }).then(response => {
        if (response.data.code === 0) throw new Error(response.data.message);
        const editedCategory = {
          id: response.data.category.id,
          name: response.data.category.id,
        };
        commit('doneEditCategory', { editedCategory });
      }).catch(err => {
        commit('failRequest', { message: err.response.data.message });
      });
    },
  },
};
