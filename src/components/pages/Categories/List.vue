<template>
  <div class="categories">
    <app-category-post
      :access="access"
      :category="category"
      :disabled="disabled"
    />
    <app-category-list
      :theads="theads"
      :categories="categoryList"
      :error-message="errorMessage"
      :access="access"
    />
  </div>
</template>

<script>
import { CategoryList, CategoryPost } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryList: CategoryList,
    appCategoryPost: CategoryPost,
  },
  mixins: [Mixins],
  data() {
    return {
      theads: ['カテゴリー名'],
      category: '',
      disabled: false,
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
  created() {
    this.$store.dispatch('categories/getAllCategoryList');
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
}
</style>
