<template>
  <div>
    <app-category-post
      class="category_post"
      :access="access"
    />
    <app-category-list
      class="category_list"
      :categories="categoriesList"
      :access="access"
      :theads="theads"
    />
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';

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
    categoriesList() {
      return this.$store.state.categories.categoriesList;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() {
    this.$store.dispatch('categories/getAllCategories');
  },

};

</script>

<style>
  .category_post {
    float: left;
    width: 40%;
    margin-right: 20px;
  }
  .category_list {
    border-left: 2px solid $separator-color;

  }
  .category_list.category-list {
    padding: 10px 0 20px 20px;
  }
</style>
