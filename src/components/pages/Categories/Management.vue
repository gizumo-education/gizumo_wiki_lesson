<template>
  <ul class="category">
    <!-- カテゴリー管理 -->
    <li class="category-post">
      <app-category-post
        :access="access"
      />
    </li>
    <!-- カテゴリー名 -->
    <li class="category-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :access="access"
      />
    </li>
  </ul>
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
    this.$store.dispatch('categories/getCategories');
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &-post {
    width: 40%;
    border-right: 0.5px solid $separator-color;
    padding: 0 20px;
  }
  &-list {
    padding: 0 10px;
  }
}
</style>
