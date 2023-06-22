<template>
  <div class="category">
    <app-category-post
      :access="access"
      class="category-post"
      :category="categoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :disabled="loading"
      @update-value="categoryName = $event.target.value"
      @handle-submit="postCategory"
    />
    <app-category-list
      :categories="categoryList"
      :access="access"
      :theads="theads"
      :delete-category-name="deleteCategoryName"
      :disabled="loading"
      :error-message="errorMessage"
      class="category-list-management"
      @open-modal="openDeleteModal"
      @handle-click="handleClick"
      @close-modal="toggleModal"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixin from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixin],
  data() {
    return {
      theads: ['カテゴリー名'],
      categoryName: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categoriesList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategory.name;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    postCategory() {
      this.$store.dispatch('categories/createCategory', this.categoryName).then(() => {
        this.categoryName = '';
      });
    },
    openDeleteModal(categoryId, categoryName) {
      this.$store.dispatch(
        'categories/setTargetDeleteCategory',
        { categoryId, categoryName },
      );
      this.toggleModal();
    },
    handleClick() {
      this.$store.dispatch('categories/deleteCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
      this.toggleModal();
    },
  },
};
</script>

<style>
  .category {
    display: flex;
  }

  .category-post {
    width: 40%;
    border-right: 3px solid #eaeaea;
    padding-right: 20px;
  }

  .category-list-management {
    margin-left: 20px;
  }
</style>
