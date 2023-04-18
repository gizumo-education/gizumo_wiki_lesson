<template>
  <app-category-list
    :threads="threads"
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
    threads() {
      return ['カテゴリー名'];
    },
    categories() {
      return this.$store.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
};
</script>

<style>

</style>
