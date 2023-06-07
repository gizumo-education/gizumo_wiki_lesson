<template>
  <div class="wrapper">
    <app-category-post
      class="wrapper__post"
      :access="access"
    />
    <app-category-list
      class="wrapper__list"
      :access="access"
      :categories="categories"
      :theads="theads"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};

</script>

<style lang="scss" scoped>

.wrapper {
  display: flex;
  &__post {
    flex-basis: 35%;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid $separator-color;
  }
  &__list {
    flex-grow: 1;
  }
}
</style>
