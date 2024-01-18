<template>
  <div class="category">
    <app-category-post
      class="form"
      :disabled="loading"
      :access="access"
      :error-message="errorMessage"
      :category="category"
      :done-message="doneMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="list"
      :theads="theads"
      :categories="categoryList"
      :delete-category-name="deleteCategoryName"
      :loading="loading"
      :access="access"
      @open-modal="openModal"
      @handle-click="handleClick"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.Name;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    clearMessage() {
      this.store.dispatch('categories/clearMessage');
    },
    updateValue(event) {
      this.category = event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory', this.category).then(() => {
        this.category = '';
      });
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory');
      this.toggleModal();
    },
    openModal(categoryId, categoryName) {
      this.$store.dispatch('categories/confirmDeleteCategoryId', categoryId);
      this.$store.dispatch('categories/confirmDeleteCategoryName', categoryName);
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    writing-mode: lr-tb;
  }
  .form {
    flex-basis: 40%;
    border-right: 1px solid #ccc;
    padding-right: 2%;
  }
  .list {
    flex-basis: 60%;
    padding-left: 2%;
  }
  .td {
    padding: 40%;
  }
</style>
