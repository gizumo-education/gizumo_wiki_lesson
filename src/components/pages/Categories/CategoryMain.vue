<template>
  <section class="category-list category">
    <app-category-post
      class="category__post"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :category="newCategory"
      :access="access"
      :loading="loading"
      @clear-message="clearMessage"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <app-category-list
      class="category__list"
      :theads="theads"
      :access="access"
      :categories="categoryList"
    />
  </section>
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
    newCategory() {
      return this.$store.state.categories.targetCategory.name;
    },
    categoryList() {
      return this.$store.state.categories.categories;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateCategoryName', $event.target.value);
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    &__post {
      flex: 40%;
      padding-right: 20px;
    }
    &__list {
      padding-left: 20px;
      flex: 60%;
      border-left: 1px solid #c0c6c9;
      height: calc(100vh - 90px);
    }
  }
</style>
