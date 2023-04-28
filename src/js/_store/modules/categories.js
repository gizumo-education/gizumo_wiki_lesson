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
    },
    doneAddCategory(state) {
      state.doneMessage = '新規カテゴリーの追加が完了しました。';
    },
    toggleLoading(state) {
      state.loading = !state.loading;
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
      commit('toggleLoading');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: { name: category.category },
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
          dispatch('getAllCategories');
          commit('toggleLoading');
          commit('doneAddCategory');
          resolve();
        }).catch(err => {
          commit('failRequest', { message: err.response.data.message });
          commit('toggleLoading');
        });
      });
    },
  },
};
