<template>
  <div class="categories-list-mask">
    <div class="categories-list-mask-input">
      <app-category-post
        :category="category"
        :disabled="disabled"
        :access="access"
        @update-value="updateCategory"
      />
    </div>
    <div class="categories-list-mask--confirm">
      <app-category-list
        :theads="theads"
        :categories="categoriesList"
        :access="access"
      />
    </div>
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
      categories: [],
      list: [],
      disabled: false1,
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
  &-input {
    width: 30%;
    padding-right: 20px;
    border-right: 1px solid #eaeaea;
  }
  &--confirm {
    width: 70%;
    padding-left: 20px;
  }
}
</style>
