<template>
  <div class="category-item">
    <app-category-post
      :access="access"
    />
    <app-category-list
      :categories="categoryList"
      :theads="theads"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
  .category-item {
    display: flex;
  }
</style>
