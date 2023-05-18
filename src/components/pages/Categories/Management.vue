<template>
  <div class="category">
    <div class="category-post">
      <app-category-post
        :access="access"
        :category="newCategory"
        :disabled="loading"
        :error-message="errorMessage"
        :done-message="doneMessage"
        @update-value="updateValue"
        @handle-submit="handleSubmit"
      />
    </div>
    <div class="category-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :access="access"
      />
    </div>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

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
    access() {
      return this.$store.getters['auth/access'];
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    newCategory() {
      return this.$store.state.categories.targetCategory.category.name;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getCategories');
    this.$store.dispatch('categories/clearMessages');
  },
  methods: {
    updateValue(event) {
      this.$store.dispatch('categories/targetCategory', event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory');
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &-post {
    width: 40%;
    border-right: 0.5px solid $separator-color;
    padding: 0 20px;
  }
  &-list {
    padding: 0 10px;
  }
}
</style>
