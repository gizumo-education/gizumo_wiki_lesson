<template>
  <div class="category-area">
    <app-category-post
      :category="category"
      :done-message="doneMessage"
      :error-message="errorMessage"
      :access="access"
      @clear-message="clearMessage"
      @update-value="updateValue"
      @handle-submit="handleSubmit"
    />
    <app-category-list
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
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  data() {
    return {
      theads: ['カテゴリー名'],
    };
  },
  computed: {
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    category() {
      return this.$store.state.categories.category;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
    categories() {
      return this.$store.state.categories.categories;
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    updateValue() {
      this.$store.dispatch('categories/updateValue');
    },
    handleSubmit() {
      this.$store.dispatch('categories/handleSubmit');
    },
  },
};
</script>

<style lang="scss" scoped>
.category-area {
  display: flex;
  & > div {
    width: 70%;
  }
  & > form {
    width: 30%;
    padding-right: 15px;
  }
}
</style>
