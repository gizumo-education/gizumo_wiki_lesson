<template>
  <div class="category">
    <app-category-post
      class="category_post"
      :access="access"
      :category="category"
      :loading="loading"
      :disabled="disabled"
      :error-message="errorMessagePost"
      :done-message="doneMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <div class="category_border" />
    <app-category-list
      class="category_list"
      :error-message="errorMessage"
      :categories="categoryList"
      :access="access"
      :theads="theads"
    />
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
    category() {
      return this.$store.state.categories.targetCategory.name;
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    disabled() {
      return this.$store.state.categories.disabled;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    errorMessagePost() {
      return this.$store.state.categories.errorMessagePost;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    updateValue(event) {
      const targetCategory = event.target.value;
      this.$store.dispatch('categories/updateValue', targetCategory);
    },
    handleSubmit() {
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  &_border {
    border-right: 1px solid $separator-color;
    margin: 0px 15px 0px;
  }
  &_post {
    width: 30%;
  }
  &_list {
    width: 70%;
  }
}
</style>
