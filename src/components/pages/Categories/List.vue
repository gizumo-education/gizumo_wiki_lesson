<template>
  <div class="categories-list-mask">
    <app-category-post
      :category="category"
      :disabled="disabled"
      :access="access"
      :class="{ 'categories-list-mask-common': true }"
      @update-value="updateCategory"
    />
    <app-category-list
      :theads="theads"
      :categories="categoriesList"
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
      category: '',
      disabled: false,
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.category.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.getAllCategories();
  },
  methods: {
    updateCategory(value) {
      this.category = value;
    },
    getAllCategories() {
      this.$store.dispatch('category/getAllCategories');
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-list-mask {
  display: flex;
  justify-content: space-between;
  &-common {
    width: 40%;
    padding-right: 4px;
    border-right: 1px solid #eaeaea;
  }
}
</style>
