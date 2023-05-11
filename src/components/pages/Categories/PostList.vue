<template>
  <div class="category">
    <div class="category_post">
      <app-category-post
        :access="access"
      />
    </div>
    <app-category-list
      :categories="categories"
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
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories;
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
  &_post {
    width: 40%;
  }
}
</style>
