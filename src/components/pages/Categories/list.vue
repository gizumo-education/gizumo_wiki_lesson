<template>
  <div class="category">
    <app-category-post
      class="category__post"
      :category="category"
      :access="access"
      :loading="loading"
      :value="categoryName"
      :done-message="doneMessage"
      :error-message="errorMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
      class="category__list"
      :categories="categoriesList"
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
      category: '',
    };
  },
  computed: {
    categoriesList() {
      return this.$store.state.categories.categoryList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    categoryName() {
      return this.$store.state.categories.targetCategory.category.name;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
    this.$store.state.categories.doneMessage = '';
    this.$store.state.categories.errorMessage = '';
  },
  methods: {
    updateValue($event) {
      this.category = $event.target.value;
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory', this.category);
      this.category = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  &__post {
    float: left;
    width: 35%;
    padding-right: 20px;
  }
  &__list {
    border-left: 1px solid #e0e0e0;
    padding-left: 19px;
    overflow: hidden;
  }
}
</style>
