<template>
  <div class="categories-list-mask">
    <app-category-post
      :category="category"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :disabled="disabled"
      :access="access"
      @update-value="updateCategory"
      @clear-message="clearMessage"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      :theads="theads"
      :categories="categoriesList"
      :delete-category-name="name"
      :access="access"
      :error-message="errorMessage"
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
    clearMessage() {
      this.errorMessage = '';
      this.doneMessage = '';
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
    padding-right: 24px;
    border-right: 1px solid #eaeaea;
  }
}
</style>
