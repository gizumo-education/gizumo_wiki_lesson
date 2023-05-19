<template>
  <div
    class="category"
  >
    <app-category-post
      class="category-post"
      :access="access"
      :error-message="errorMessage"
    />
    <app-category-list
      class="category-list"
      :theads="theads"
      :categories="categories"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.category {
  // width: 100%;
  display: flex;
  .category-post {
    margin-right: 20px;
    width: 35%;
  }
  .category-list {
    padding-left: 20px;
    width: 65%;
    border-left: solid 1px $separator-color;
  }
}
</style>
