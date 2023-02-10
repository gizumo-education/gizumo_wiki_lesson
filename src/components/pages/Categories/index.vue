<template>
  <div class="categories">
    <app-category-post
      class="categories-input"
      :error-message="errorMessage"
      :access="access"
    />
    <app-category-list
      class="categories-list"
      :access="access"
      :categories="categoryList"
      :theads="theads"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';

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
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>
<style lang="scss" scoped>
.categories {
  display: flex;
  flex-direction: row;

  &-input {
    width: 35%;
  }

  &-list {
    width: 65%;
    overflow:hidden;
    border-left: 2px solid #e3e3e3;
    margin-left: 20px;
    padding-left: 20px;
  }
}
</style>
