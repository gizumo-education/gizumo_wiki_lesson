<template>
  <div class="categories">
    <app-category-post
      class="categories-post"
      :access="access"
    />
    <app-category-list
      class="categories-list"
      :theads="theads"
      :categories="categoriesList"
      :access="access"
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
    categoriesList() {
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
<style lang="scss" scoped>
  .categories {
    display: flex;
    height: 100%;
    &-post {
      padding-right: 2%;
      width: 50%;
      border-right: 1px solid #ccc;
    }
    &-list {
      margin-left: 2%;
      width: 48%;
      overflow-y: scroll;
      background-color: #fff;
    }
  }
</style>
