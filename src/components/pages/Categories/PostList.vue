<template>
  <div class="category">
    <div class="category_post">
      <app-category-post
        :access="access"
        :error-message="errorMessage"
      />
    </div>
    <app-category-list
      :access="access"
      :theads="theads"
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
      return this.$store.state.categories.categories;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
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
    width: 30%;
  }
}
</style>
