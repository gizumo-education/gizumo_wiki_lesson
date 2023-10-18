import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    category: {
      id: null,
      name: '',
    },
    categoryList: [],
    loading: false,
    doneMessage: '',
    errorMessage: '',
    deleteCategory: {
      id: null,
      name: '',
    },
  },
  getters: {
    transformedCategories(state) {
      return state.categoryList;
    },
    getCategory(state) {
      return state.category.name;
    },
    deleteCategoryId: state => state.deleteCategory.id,
    deleteCategoryName: state => state.deleteCategory.name,
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    applyRequest(state) {
      state.loading = true;
    },
    doneGetAllCategories(state, payload) {
      state.categoryList = [...payload.categories];
      return state.categoryList.reverse();
    },
    createCategory(state, category) {
      state.category.name = category;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    doneEditCategory(state, { name, value }) {
      state.category[name] = value;
      state.loading = false;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    deletePostName(state) {
      state.category.name = '';
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
      state.loading = false;
    },
    confirmCategory(state, { categoryName, categoryId }) {
      state.deleteCategory.name = categoryName;
      state.deleteCategory.id = categoryId;
    },
    doneDeleteCategory(state) {
      state.deleteCategory.id = null;
      state.deleteCategory.name = null;
    },
    doneGetCategory(state, { category }) {
      state.category = { ...state.category, ...category };
      state.loading = false;
    },
    updateValue(state, { name, value }) {
      state.category = { ...state.category, [name]: value };
    },
    deleteValue(state) {
      state.category.name = '';
    },
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(res => {
        const payload = {
          categories: res.data.categories,
        };
        commit('doneGetAllCategories', payload);
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    createCategory({ commit }, category) {
      commit('createCategory', category);
    },
    postCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', state.category.name);
      axios(rootGetters['auth/token'])({
        method: 'POST',
        url: '/category',
        data,
      }).then(() => {
        commit('clearMessage');
        this.dispatch('categories/getAllCategories');
        commit('displayDoneMessage');
        commit('deletePostName');
        commit('toggleLoading');
      }).catch(err => {
        commit('failRequest', { message: err.message });
        commit('toggleLoading');
      });
    },
    confirmCategory({ commit }, { categoryName, categoryId }) {
      commit('confirmCategory', { categoryName, categoryId });
    },
    deleteCategory({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${rootGetters['categories/deleteCategoryId']}`,
      }).then(() => {
        commit('doneDeleteCategory');
        this.dispatch('categories/getAllCategories');
        commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    getCategory({ commit, rootGetters }, { id }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then(res => {
        const data = res.data.category;
        const category = {
          id: data.id,
          name: data.name,
        };
        commit('doneGetCategory', { category });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
    updateValue({ commit }, target) {
      commit('updateValue', target);
    },
    deleteValue({ commit }) {
      commit('deleteValue');
    },
    editCategory({ commit, rootGetters }, category) {
      commit('applyRequest');
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${category.id}`,
        data: category,
      }).then(res => {
        if (res.data.code === 0) throw new Error(res.data.message);
        const editedCategory = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        commit('doneEditCategory', { editedCategory });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
