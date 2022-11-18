<template>
  <div class="category">
    <app-category-post
      class="category-post"
      :category="category"
      :access="access"
      :error-message="errorMessage"
    />
    <app-category-list
      class="category-list"
      :categories="categories"
      :theads="theads"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    category() {
      return this.$store.state.category;
    },
    categories() {
      return this.$store.state.categories.categories;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/AllCategories');
  },
};
</script>

<style lang="postcss" scoped>
  .category {
    display: flex;
  }
  .category-post {
      width: 30%;
      padding-right: 20px;
      margin-right: 20px;
      border-right: solid 2px #c0c0c0;
    }
    .category-list {
      width: 70%;
    }
</style>
