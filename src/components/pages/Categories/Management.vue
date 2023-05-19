<template>
  <div class="category">
    <app-category-post
      :access="access"
      class="category-post"
    />
    <app-category-list
      :categories="categoryList"
      :access="access"
      :theads="theads"
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
    categoryList() {
      return this.$store.state.categories.categoriesList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$store.dispatch('categories/getAllCategories');
    },
  },
};
</script>

<style>
  .category {
    display: flex;
  }

  .category-post {
    width: 40%;
    border-right: 3px solid #eaeaea;
    padding-right: 20px;
  }
</style>
