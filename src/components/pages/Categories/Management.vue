<template>
  <section class="category-content">
    <div class="category-content__post">
      <app-category-post
        :error-message="errorMessage"
        :category="category"
        :access="access"
      />
    </div>
    <div class="category-content__list">
      <app-category-list
        :categories="categoryList"
        :theads="theads"
        :access="access"
      />
    </div>
  </section>
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
      category: '',
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
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  method: {
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.category-content {
  display: flex;
  &__post {
    width: 35%;
    padding-right: 20px;
    border-right: 1px solid #ccc;
  }
  &__list {
    width: 65%;
    height: 680px;
    overflow: hidden;
    padding-left: 20px;
  }
}
</style>
