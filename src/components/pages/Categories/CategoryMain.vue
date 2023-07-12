<template>
  <section class="category-list">
    <div class="category">
      <app-category-post
        class="category__post"
        :category="name"
        :access="access"
      />
      <app-category-list
        class="category__list"
        :theads="theads"
        :access="access"
        :categories="categoryList"
      />
    </div>
  </section>
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
      name: '',
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categories;
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
    display: flex;
    &__post {
      flex: 40%;
      padding-right: 20px;
    }
    &__list {
      padding-left: 20px;
      flex: 60%;
      border-left: 1px solid #c0c6c9;
      height: calc(100vh - 90px);
    }
  }
</style>
