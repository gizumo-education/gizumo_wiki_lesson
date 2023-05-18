<template>
  <div
    class="categoryObject"
  >
    <app-category-post
      class="categoryPost"
      :access="access"
      :error-message="errorMessage"
    />
    <app-category-list
      class="categoryList"
      :theads="theads"
      :categories="categories"
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
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.categoryObject {
  // width: 100%;
  display: flex;
  .categoryPost {
    margin-right: 20px;
    width: 35%;
  }
  .categoryList {
    padding-left: 20px;
    width: 65%;
    border-left: solid 1px $separator-color;
  }
}
</style>
