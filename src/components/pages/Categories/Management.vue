<template>
  <div class="category">
    <!-- カテゴリー管理 -->
    <div class="category-post">
      <app-category-post
        :access="access"
      />
    </div>
    <!-- カテゴリー名 -->
    <div class="category-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :access="access"
      />
    </div>
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
