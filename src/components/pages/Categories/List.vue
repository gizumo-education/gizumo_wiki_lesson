<template>
  <div class="category-item">
    <app-category-post
      class="category-item-post"
      :category="categoryName"
      :access="access"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :disabled="disabled"
      :loading="loading"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <app-category-list
      class="category-item-list"
      :categories="categoryList"
      :theads="theads"
      :access="access"
      :delete-category-name="deleteCategoryName"
      @open-modal="openModal"
      @handle-click="handleClick"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    categoryName() {
      return this.$store.state.categories.targetCategory.name;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    disabled() {
      return this.access.create && this.loading;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    openModal(categoryId, categoryName) {
      const deleteCategory = { categoryId, categoryName };
      this.$store.dispatch('categories/confirmDeleteCategory', deleteCategory);
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.toggleModal();
      });
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
  .category-item {
    display: flex;
    &-post {
      width: 35%;
      margin-right: 20px;
    }
    &-list {
      width: 65%;
      border-left: 1px solid $separator-color;
      padding-left: 20px;
      overflow: hidden;
    }
  }
</style>
