<template>
  <div class="category">
    <app-category-post
      class="category_post"
      :category="category"
      :access="access"
    />
    <app-category-list
      class="category_list"
      :access="access"
      :theads="theads"
      :categories="categoryList"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      category: '',
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
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &_post {
    width: 30%;
    border-right: 1px solid $separator-color;
    padding-right: 15px;
  }
  &_list {
    width: 70%;
    padding-left: 15px;
  }
}
</style>
