<template>
  <div class="category">
    <app-category-post
      class="category-post"
      :access="access"
      :category="targetCategory"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :disabled="isLoading"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
      @clear-message="clearMessage"
    />
    <app-category-list
      class="category-list"
      :categories="categories"
      :theads="theads"
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
      targetCategory: '',
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.categories.isLoading;
    },
    categories() {
      return this.$store.state.categories.categories;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/allCategories');
  },
  methods: {
    updateValue(event) {
      this.targetCategory = event.target.value;
    },
    handleSubmit() {
      this.$store.dispatch('categories/createCategory', this.targetCategory).then(() => {
        this.$store.dispatch('categories/allCategories');
      });
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
    &-post {
      width: 30%;
      padding-right: 20px;
      margin-right: 20px;
      border-right: solid 2px #c0c0c0;
    }
    &-list {
      width: 70%;
    }
  }
</style>
