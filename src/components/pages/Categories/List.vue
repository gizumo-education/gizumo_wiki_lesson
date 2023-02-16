<template>
  <section class="category-flex">
    <div class="category-post-pages">
      <app-category-post
        :access="access"
      />
    </div>
    <div class="category-list-pages">
      <app-category-list
        :categories="categoryList"
        :access="access"
      />
    </div>
  </section>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
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
  .category-flex {
    display: flex;
  }
  .category-post-pages {
    width: 30%;
    padding-right: 30px;
  }
  .category-list-pages {
    width: 70%;
    padding-left: 30px;
    border-left: 2px solid $separator-color;
  }
</style>
