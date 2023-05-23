<template>
  <div
    class="category"
  >
    <app-category-post
      class="category-post"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      :category="category"
      @reset-message="resetMessage"
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
    category() {
      return this.$store.state.categories.category.name;
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
    resetMessage() {
      this.$store.dispatch('categories/resetMessage');
    },
    updateValue(event) {
      const { target } = event;
      this.$store.dispatch('categories/updateValue', target.value);
    },
    handleSubmit() {
      const categoryName = this.category;
      this.$store.dispatch('categories/createCategories', categoryName).then(() => {
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
