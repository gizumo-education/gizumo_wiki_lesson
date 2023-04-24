<template>
  <div class="category">
    <app-category-post
      class="category_post"
      :access="access"
    />
    <div class="category_border" />
    <app-category-list
      class="category_list"
      :error-message="errorMessage"
      :categories="categoryList"
      :theads="theads"
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
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    theads() {
      return ['カテゴリー名'];
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
  &_border{
    border-right: 1px solid #eaeaea;
    margin: 0px 15px 0px ;
  }
  &_post{
    width: 400px;
  }
}
</style>
