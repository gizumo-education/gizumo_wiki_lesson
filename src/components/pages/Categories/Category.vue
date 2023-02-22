<template>
  <section class="category-flex">
    <div class="category-post-pages">
      <app-category-post
        :access="access"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :category="targetCategory.name"
        @update-value="$event =>targetCategory.name = $event.target.value"
        @clear-message="clearMessage"
        @handle-submit="createCategory"
      />
    </div>
    <div class="category-list-pages">
      <app-category-list
        :categories="categoryList"
        class="category__list"
        :theads="theads"
        :access="access"
      />
    </div>
  </section>
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
      targetCategory: {
        name: '',
      },
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
    categoryList() {
      return this.$store.state.categories.categoryList;
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: {
    clearMessage() {
      this.$store.dispatch('categories/clearMessage');
    },
    createCategory() {
      if (this.loading) return;
      this.$store.dispatch('categories/createCategory', {
        /* eslint-disable-next-line no-irregular-whitespace */
        name: this.targetCategory.name.replace(/( |　)+/, '').trim(),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .category-flex {
    display: flex;
  }
  .category-post-pages {
    width: 30%;
    padding-right: 30px;
  }
  .category-list-pages {
    width: 70%;
    padding-left: 30px;
    border-left: 2px solid $separator-color;
  }
</style>
