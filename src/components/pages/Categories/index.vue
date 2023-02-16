<template>
  <div class="category">
    <app-category-post
      class="category__post"
      :access="access"
    />
    <app-category-list
      :categories="categoryList"
      class="category__list"
      :access="access"
    />
    <router-view />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  computed: {
    categoryList() {
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

<style lang="scss" scope>
.category {
  display: flex;
  justify-content: space-around;
  &__post{
    width: 30%;
  }
  &__list{
    width: 70%;
    border-left: 2px solid #eaeaea;
    padding-left: 20px;
  }
}
</style>
