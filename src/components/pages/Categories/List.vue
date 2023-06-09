<template>
  <div class="wrapper">
    <div class="wrapper__post">
      <app-category-post
        :category="categoryName"
        :access="access"
        :done-message="doneMessage"
        :error-message="errorMessage"
        @update-value="updateValue"
        @handle-submit="handleSubmit"
      />
    </div>
    <div class="wrapper__list">
      <app-category-list
        :access="access"
        :categories="categories"
        :theads="theads"
      />
    </div>
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
    categoryName() {
      return this.$store.state.categories.category.name;
    },
    categories() {
      return this.$store.state.categories.categoryList;
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
    this.$store.dispatch('categories/initCategory');
    this.$store.dispatch('categories/clearMessage');
  },
  methods: {
    updateValue($event) {
      this.$store.dispatch('categories/updateCategory', $event.target.value);
    },
    handleSubmit() {
      if (this.loading) return;
      this.$store.dispatch('categories/postCategory').then(() => {
        this.$store.dispatch('categories/getAllCategories');
      });
    },
  },
};

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  &__post {
    flex-basis: 35%;
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid $separator-color;
  }
  &__list {
    flex-grow: 1;
  }
}
</style>
