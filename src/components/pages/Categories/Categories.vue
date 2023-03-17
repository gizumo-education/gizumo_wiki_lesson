<template>
  <div class="category-page">
    <app-category-post
      :access="access"
      :category="category"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :loading="loading"
      class="category-page__post"
      @handle-submit="handleSubmit"
      @update-value="updateValue"
    />
    <div class="category-page__list">
      <app-category-list
        :theads="theads"
        :access="access"
        :categories="categoryList"
      />
    </div>>
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
    access() {
      return this.$store.getters['auth/access'];
    },
    category() {
      const { name } = this.$store.state.categories.category;
      return name;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategories');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateValue', $event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.category-page {
  display: flex;
  &__post {
    border-right: 2px solid #ccc;
    padding-right: 2%;
    width: 40%;
  }
  &__list {
    padding-left: 2%;
    white-space: nowrap;
  }
}
</style>
