<template>
  <div class="categories">
    <div class="categories__post">
      <app-category-post
        :category="targetCategory"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :disabled="disabled"
        :access="access"
      />
    </div>
    <div class="categories__content">
      <app-category-list
        :theads="theads"
        :categories="categories"
        :delete-category-name="deleteCategoryName"
        :access="access"
      />
    </div>
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    AppCategoryList: CategoryList,
    AppCategoryPost: CategoryPost,
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    targetCategory() {
      return this.$store.state.categories.targetCategory;
    },
    theads() {
      return this.$store.state.categories.theads;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang='scss' scoped>
  .categories {
    height: calc(100vh - 54px);;
    display: flex;

    &__post {
      height: calc(100vh - 54px);;
      width: 30%;
      margin-right: 25px;
    }

    &__content {
      height: calc(100vh - 54px);
      width: 70%;
      padding-left: 25px;
      border-left: 1px solid #cdcdcd;
    }
  }
</style>
