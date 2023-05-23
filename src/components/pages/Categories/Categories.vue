<template>
  <div
    class="category"
  >
    <app-category-post
      class="category-post"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :category="categoryName"
      :disabled="loading"
      @clear-message="clearMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category-list"
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
    loading() {
      return this.$store.state.categories.loading;
    },
    categoryName() {
      return this.$store.state.categories.categoryName;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categoryList;
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
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue(event) {
      this.$store.dispatch('categories/updateValue', event.target.value);
    },
    handleSubmit() {
      this.$store.dispatch('categories/createCategories', this.categoryName).then(() => {
        this.$store.dispatch('categories/getAllCategories');
        this.$store.dispatch('categories/resetMessage');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  .category-post {
    margin-right: 20px;
    width: 35%;
  }
  .category-list {
    padding-left: 20px;
    width: 65%;
    border-left: solid 1px $separator-color;
  }
}
</style>
