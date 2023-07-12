<template>
  <div class="category">
    <app-category-post
      category=""
      class="category__post"
      :access="access"
    />
    <app-category-list
      class="category__list"
      :categories="categoriesList"
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
.category {
  &__post {
    float: left;
    width: 38%;
    padding-right: 20px;
  }
  &__list {
    border-left: 1px solid #e0e0e0;
    padding-left: 19px;
    overflow: hidden;
  }
}
</style>
