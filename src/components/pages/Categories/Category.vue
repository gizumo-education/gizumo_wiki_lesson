<template>
  <div class="categories">
    <app-category-post
      class="categories_post"
      :access="access"
    />
    <app-category-list
      class="categories_list"
      :theads="theads"
      :categories="categoriesList"
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
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  height: 100%;

  &_post {
    width: 38%;
  }
  &_list {
    width: 62%;
    margin-left: 18px;
    padding-left: 18px;
    border-left: 2px solid $separator-color;
    overflow: hidden;
  }
}
</style>
