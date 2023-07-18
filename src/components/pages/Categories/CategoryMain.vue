<template>
  <section class="category-list category">
    <app-category-post
      class="category__post"
      :category="categoryName"
      :access="access"
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
      categoryName: '',
      targetCategory: {
        name: '',
        id: null,
      },
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.categories.categories;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
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
      this.$store.dispatch('categories/postArticle');
    },
    updateValue($event) {
      this.$store.dispatch('categories/updateCategoryName', $event.target.value);
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
