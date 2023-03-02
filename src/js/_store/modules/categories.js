import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    category: {
      id: null,
      name: '',
    },
  },

  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    updateValue(state, { name, value }) {
      state.category = { ...state.category, [name]: value };
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = categories.reverse();
    },
    editedCategory(state, payload) {
      state.category = { ...state.category, title: payload.title };
    },
    doneGetCategory(state, { category }) {
      state.category = { ...state.category, ...category };
      console.log(state.category);
    },
    toggleLoading(state) {
      state.isLoading = !state.isLoading;
    },
    modalDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
    },
    doneEditCategory(state, { category }) {
      state.category = { ...state.category, ...category };
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
    failRequest(state, { message }) {
      state.errorMessage = message;
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
      commit('toggleLoading');
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then(response => {
        if (!response.data.categories) throw new Error(response.data.message);
        const categories = response.data.categories.map(data => ({
          id: data.id,
          name: data.name,
        }));
        commit('toggleLoading');
        commit('doneGetAllCategories', { categories });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    // カテゴリー1件取得
    getCategory({ commit, rootGetters }, { id }) {
      new Promise((resolve)=>{
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${id}`,
        }).then(response => {
          if (response.data.code === 0) throw new Error(response.data.message);
  
          const data = response.data.category;
          const category = {
            id: data.id,
            name: data.name,
          };
          commit('toggleLoading');
          commit('doneGetCategory', { category });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      })
    },
    // カテゴリー新規作成
    createCategory({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');
      return new Promise(resolve => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data: categoryName,
        }).then(response => {
          commit('toggleLoading');
          if (response.data.code === 0) throw new Error(response.data.message);
          commit('displayDoneMessage', { message: '新規カテゴリーの追加が完了しました' });
          resolve();
        }).catch(err => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
        });
      });
    },
    editedCategory({ commit }, title) {
      commit({
        type: 'editedCategory',
        title,
      });
    },
    // カテゴリー更新
    editCategory({ commit, rootGetters }, category) {
      commit('toggleLoading');

      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${category.id}`,
        data: category,
      }).then(response => {
        console.log(response);
        if (response.data.code === 0) throw new Error(response.data.message);
        
        const editedCategory = {
          id: response.data.category.id,
          name: response.data.category.name,
        };
        
        commit('toggleLoading');
        commit('doneEditCategory', { editedCategory });
      }).catch(err => {
        commit('toggleLoading');
        commit('failRequest', { message: err.message });
      });
    },
    // カテゴリー削除のモーダルを開く
    modalCategory({ commit }, { categoryId, categoryName }) {
      commit('modalDeleteCategory', { categoryId, categoryName });
    },
    // カテゴリー削除
    deleteCategory({ commit, rootGetters }, categoryId) {
      commit('clearMessage');
      const data = new URLSearchParams();
      axios(rootGetters['auth/token'])({
        method: 'DELETE',
        url: `/category/${categoryId}`,
        data,
      }).then(() => {
        commit('doneDeleteCategory');
        commit('displayDoneMessage', { message: 'カテゴリーを削除しました' });
      }).catch(err => {
        commit('failRequest', { message: err.message });
      });
    },
  },
};
