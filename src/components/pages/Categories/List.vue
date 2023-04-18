<template>
  <app-category-list
    :theads="theads"
    :categories="categories"
    :delete-category-name="deleteCategoryName"
    :access="access"
  />
</template>

<script>
import { CategoryList } from '@Components/molecules';

export default {
  components: {
    AppCategoryList: CategoryList,
  },
  computed: {
    theads() {
      return this.$store.state.categories.theads;
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    deleteCategoryName() {
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style>

</style>
